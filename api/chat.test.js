import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from './chat.js';

function makeRes() {
  const res = {
    statusCode: null,
    body: null,
    headers: {},
    written: [],
    ended: false,
  };
  res.status = vi.fn((code) => { res.statusCode = code; return res; });
  res.json = vi.fn((obj) => { res.body = obj; return res; });
  res.setHeader = vi.fn((key, value) => { res.headers[key] = value; });
  res.write = vi.fn((chunk) => { res.written.push(chunk); });
  res.end = vi.fn(() => { res.ended = true; });
  return res;
}

function makeStreamingResponse(sseLines) {
  let i = 0;
  const reader = {
    read: vi.fn(async () => {
      if (i < sseLines.length) {
        const value = new TextEncoder().encode(sseLines[i++]);
        return { done: false, value };
      }
      return { done: true, value: undefined };
    }),
  };
  return { ok: true, body: { getReader: () => reader } };
}

beforeEach(() => {
  vi.stubEnv('ANTHROPIC_API_KEY', 'test-key');
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('handler', () => {
  it('rejects non-POST requests with 405', async () => {
    const res = makeRes();
    await handler({ method: 'GET', body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.body).toEqual({ error: 'Method not allowed' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects requests with no message with 400', async () => {
    const res = makeRes();
    await handler({ method: 'POST', body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({ error: 'No message provided' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('forwards the API key and message to the Anthropic API', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ content: [] }) });
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: false } }, res);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'x-api-key': 'test-key' }),
      })
    );
    const sentBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sentBody.messages).toEqual([{ role: 'user', content: 'hi' }]);
    expect(sentBody.stream).toBe(false);
  });

  it('propagates the upstream error status and message', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: 'rate limited' } }),
    });
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi' } }, res);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.body).toEqual({ error: 'rate limited' });
  });

  it('falls back to a generic error message when the upstream error has none', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500, json: async () => ({}) });
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi' } }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({ error: 'API error' });
  });

  it('returns joined text content for non-streaming requests', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [
          { type: 'text', text: 'Hello ' },
          { type: 'text', text: 'world' },
          { type: 'other', text: 'ignored' },
        ],
      }),
    });
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: false } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({ content: 'Hello world' });
  });

  it('returns an empty string when non-streaming response has no content', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: false } }, res);

    expect(res.body).toEqual({ content: '' });
  });

  it('streams parsed content_block_delta text as SSE and forwards [DONE]', async () => {
    fetch.mockResolvedValue(
      makeStreamingResponse([
        'data: ' + JSON.stringify({ type: 'content_block_delta', delta: { text: 'Hi' } }) + '\n\n',
        'data: ' + JSON.stringify({ type: 'content_block_delta', delta: { text: ' there' } }) + '\n\n',
        'data: [DONE]\n\n',
      ])
    );
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: true } }, res);

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
    expect(res.written).toEqual([
      'data: ' + JSON.stringify({ text: 'Hi' }) + '\n\n',
      'data: ' + JSON.stringify({ text: ' there' }) + '\n\n',
      'data: [DONE]\n\n',
    ]);
    expect(res.end).toHaveBeenCalled();
  });

  it('ignores stream events that are not content_block_delta', async () => {
    fetch.mockResolvedValue(
      makeStreamingResponse([
        'data: ' + JSON.stringify({ type: 'message_start' }) + '\n\n',
        'data: ' + JSON.stringify({ type: 'content_block_delta', delta: { text: 'ok' } }) + '\n\n',
      ])
    );
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: true } }, res);

    expect(res.written).toEqual(['data: ' + JSON.stringify({ text: 'ok' }) + '\n\n']);
  });

  it('silently swallows malformed JSON lines in the stream and keeps going', async () => {
    fetch.mockResolvedValue(
      makeStreamingResponse([
        'data: {not valid json\n\n',
        'data: ' + JSON.stringify({ type: 'content_block_delta', delta: { text: 'ok' } }) + '\n\n',
      ])
    );
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi', stream: true } }, res);

    expect(res.written).toEqual(['data: ' + JSON.stringify({ text: 'ok' }) + '\n\n']);
    expect(res.end).toHaveBeenCalled();
  });

  it('returns 500 when the upstream fetch throws', async () => {
    fetch.mockRejectedValue(new Error('network down'));
    const res = makeRes();
    await handler({ method: 'POST', body: { message: 'hi' } }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({ error: 'network down' });
  });
});
