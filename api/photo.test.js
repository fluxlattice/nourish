import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from './photo.js';

function makeRes() {
  const res = { statusCode: null, body: null };
  res.status = vi.fn((code) => { res.statusCode = code; return res; });
  res.json = vi.fn((obj) => { res.body = obj; return res; });
  return res;
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('handler', () => {
  it('rejects non-GET requests with 405', async () => {
    const res = makeRes();
    await handler({ method: 'POST', query: {} }, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects requests with no query with 400', async () => {
    const res = makeRes();
    await handler({ method: 'GET', query: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns a null url when no access key is configured', async () => {
    const res = makeRes();
    await handler({ method: 'GET', query: { q: 'pancakes' } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({ url: null });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns a null url when Unsplash responds with an error status', async () => {
    vi.stubEnv('UNSPLASH_ACCESS_KEY', 'test-key');
    fetch.mockResolvedValue({ ok: false, status: 403 });
    const res = makeRes();
    await handler({ method: 'GET', query: { q: 'pancakes' } }, res);
    expect(res.body).toEqual({ url: null });
  });

  it('returns a null url when there are no search results', async () => {
    vi.stubEnv('UNSPLASH_ACCESS_KEY', 'test-key');
    fetch.mockResolvedValue({ ok: true, json: async () => ({ results: [] }) });
    const res = makeRes();
    await handler({ method: 'GET', query: { q: 'pancakes' } }, res);
    expect(res.body).toEqual({ url: null });
  });

  it('returns a null url when the fetch throws', async () => {
    vi.stubEnv('UNSPLASH_ACCESS_KEY', 'test-key');
    fetch.mockRejectedValue(new Error('network down'));
    const res = makeRes();
    await handler({ method: 'GET', query: { q: 'pancakes' } }, res);
    expect(res.body).toEqual({ url: null });
  });

  it('forwards the access key and query to Unsplash, returning the first photo', async () => {
    vi.stubEnv('UNSPLASH_ACCESS_KEY', 'test-key');
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            urls: { small: 'https://images.unsplash.com/photo-1' },
            user: { name: 'Jane Doe', links: { html: 'https://unsplash.com/@jane' } },
            links: { html: 'https://unsplash.com/photos/1', download_location: 'https://api.unsplash.com/photos/1/download' },
          },
        ],
      }),
    });
    const res = makeRes();
    await handler({ method: 'GET', query: { q: 'greek yogurt bowl' } }, res);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('greek yogurt bowl')),
      expect.objectContaining({ headers: { Authorization: 'Client-ID test-key' } })
    );
    expect(res.body).toEqual({
      url: 'https://images.unsplash.com/photo-1',
      photographer: 'Jane Doe',
      photographerUrl: 'https://unsplash.com/@jane',
      unsplashUrl: 'https://unsplash.com/photos/1',
    });
  });
});
