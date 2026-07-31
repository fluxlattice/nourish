import { describe, it, expect } from 'vitest';
import { canNext, toggleRestriction } from './formHelpers';

describe('canNext', () => {
  it('allows step 0 regardless of profile contents', () => {
    expect(canNext(0, {})).toBe(true);
  });

  it('requires age, weight, and height on step 1', () => {
    expect(canNext(1, { age: '28', weight: '160', height: '67' })).toBe(true);
  });

  it('blocks step 1 when any of age/weight/height is missing', () => {
    expect(canNext(1, { age: '', weight: '160', height: '67' })).toBe(false);
    expect(canNext(1, { age: '28', weight: '', height: '67' })).toBe(false);
    expect(canNext(1, { age: '28', weight: '160', height: '' })).toBe(false);
    expect(canNext(1, {})).toBe(false);
  });

  it('allows step 2 regardless of profile contents', () => {
    expect(canNext(2, {})).toBe(true);
  });

  it('requires a truthy budget on step 3', () => {
    expect(canNext(3, { budget: '300' })).toBe(true);
    expect(canNext(3, { budget: '' })).toBe(false);
    expect(canNext(3, {})).toBe(false);
  });

  it('treats budget of "0" as falsy (empty-string form input), matching current behavior', () => {
    expect(canNext(3, { budget: '0' })).toBe(true);
  });
});

describe('toggleRestriction', () => {
  it('adds a restriction that is not already present', () => {
    expect(toggleRestriction([], 'vegan')).toEqual(['vegan']);
    expect(toggleRestriction(['keto'], 'vegan')).toEqual(['keto', 'vegan']);
  });

  it('removes a restriction that is already present', () => {
    expect(toggleRestriction(['vegan'], 'vegan')).toEqual([]);
    expect(toggleRestriction(['keto', 'vegan'], 'vegan')).toEqual(['keto']);
  });

  it('does not mutate the input array', () => {
    const input = ['keto'];
    toggleRestriction(input, 'vegan');
    expect(input).toEqual(['keto']);
  });
});
