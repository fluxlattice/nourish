import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { describeGroceryIndex, resolveZip, describeZipForPricing, STATE_GROCERY_INDEX } from './groceryIndex';

describe('describeGroceryIndex', () => {
  it('returns null for an unknown state code', () => {
    expect(describeGroceryIndex('ZZ')).toBeNull();
  });

  it('describes an above-average state', () => {
    expect(describeGroceryIndex('HI')).toEqual({ index: 140, text: 'about 40% above the national average' });
  });

  it('describes a below-average state', () => {
    expect(describeGroceryIndex('MS')).toEqual({ index: 93, text: 'about 7% below the national average' });
  });

  it('describes a near-average state as close to average rather than a percentage', () => {
    expect(describeGroceryIndex('IL')).toEqual({ index: 100, text: 'close to the national average' });
  });

  it('every index is a positive number', () => {
    for (const [state, index] of Object.entries(STATE_GROCERY_INDEX)) {
      expect(index, state).toBeGreaterThan(0);
    }
  });
});

describe('resolveZip', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns city/state on a successful lookup', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        places: [{ 'place name': 'New York', 'state abbreviation': 'NY' }],
      }),
    });

    expect(await resolveZip('10001')).toEqual({ city: 'New York', state: 'NY' });
    expect(fetch).toHaveBeenCalledWith('https://api.zippopotam.us/us/10001');
  });

  it('returns null when the ZIP is not found', async () => {
    fetch.mockResolvedValue({ ok: false });
    expect(await resolveZip('00000')).toBeNull();
  });

  it('returns null when the response has no places', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ places: [] }) });
    expect(await resolveZip('10001')).toBeNull();
  });
});

describe('describeZipForPricing', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('includes the regional cost description when the state is known', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        places: [{ 'place name': 'Honolulu', 'state abbreviation': 'HI' }],
      }),
    });

    expect(await describeZipForPricing('96813')).toBe(
      'ZIP code 96813 (Honolulu, HI), where grocery prices run about 40% above the national average'
    );
  });

  it('falls back to a plain ZIP description when the lookup fails', async () => {
    fetch.mockResolvedValue({ ok: false });
    expect(await describeZipForPricing('00000')).toBe('ZIP code 00000');
  });

  it('falls back to a plain ZIP description when fetch throws', async () => {
    fetch.mockRejectedValue(new Error('network down'));
    expect(await describeZipForPricing('10001')).toBe('ZIP code 10001');
  });
});
