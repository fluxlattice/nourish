import { describe, it, expect } from 'vitest';
import { getSection, parseDays, parseRecipes, classifyMealType } from './planParser';

describe('getSection', () => {
  it('extracts text between the key and the next marker', () => {
    const plan = 'MEAL PLAN\nsome meals\nSHOPPING\nsome items\nTIPS\nsome tips';
    expect(getSection(plan, 'SHOPPING', 'TIPS')).toBe('some items');
  });

  it('extracts to the end of the string when next is null', () => {
    const plan = 'MEAL PLAN\nsome meals\nTIPS\nsome tips';
    expect(getSection(plan, 'TIPS', null)).toBe('some tips');
  });

  it('returns an empty string when the key is missing', () => {
    expect(getSection('no sections here', 'SHOPPING', 'TIPS')).toBe('');
  });

  it('returns everything after the key when next marker is not found', () => {
    const plan = 'SHOPPING\nsome items';
    expect(getSection(plan, 'SHOPPING', 'TIPS')).toBe('some items');
  });

  it('trims surrounding whitespace', () => {
    const plan = 'SHOPPING\n\n  padded  \n\nTIPS';
    expect(getSection(plan, 'SHOPPING', 'TIPS')).toBe('padded');
  });
});

describe('parseDays', () => {
  it('parses days and meals from a well-formed plan', () => {
    const plan = [
      'MEAL PLAN',
      'Day 1',
      'Breakfast: Oatmeal (300 cal)',
      'Lunch: Salad (400 cal)',
      'Dinner: Chicken (500 cal)',
      'Day 2',
      'Breakfast: Eggs (250 cal)',
      'RECIPES',
      'Day 1 - Breakfast: Oatmeal',
    ].join('\n');

    const days = parseDays(plan);
    expect(days).toHaveLength(2);
    expect(days[0].day).toBe(1);
    expect(days[0].meals).toHaveLength(3);
    expect(days[0].meals[0]).toEqual({ type: 'Breakfast', content: 'Oatmeal (300 cal)' });
    expect(days[1].day).toBe(2);
    expect(days[1].meals).toHaveLength(1);
  });

  it('accumulates wrapped meal description lines onto the current meal', () => {
    const plan = [
      'MEAL PLAN',
      'Day 1',
      'Breakfast: Oatmeal (300 cal)',
      'with berries and honey drizzled on top',
      'Lunch: Salad (400 cal)',
    ].join('\n');

    const days = parseDays(plan);
    expect(days[0].meals[0].content).toBe('Oatmeal (300 cal) with berries and honey drizzled on top');
  });

  it('stops the meal section at RECIPES when SHOPPING is absent', () => {
    const plan = 'MEAL PLAN\nDay 1\nBreakfast: Oatmeal\nRECIPES\nDay 1 - Breakfast: Oatmeal';
    const days = parseDays(plan);
    expect(days).toHaveLength(1);
  });

  it('stops the meal section at SHOPPING when RECIPES is absent', () => {
    const plan = 'MEAL PLAN\nDay 1\nBreakfast: Oatmeal\nSHOPPING\nDay 1 - not a real day';
    const days = parseDays(plan);
    expect(days).toHaveLength(1);
  });

  it('stops the last day at SHOPPING even when RECIPES appears later, after TIPS', () => {
    // Mirrors the real shape produced by the app: MEAL PLAN, SHOPPING, TIPS, then a
    // RECIPES section appended afterwards from a second API call.
    const plan = [
      'MEAL PLAN',
      'Day 1',
      'Breakfast: Oatmeal (300 cal) - warm and hearty.',
      'SHOPPING',
      'PRODUCE',
      '- Oats - $3',
      'TIPS',
      '1. Prep ahead.',
      'RECIPES',
      'Day 1 - Breakfast: Oatmeal',
    ].join('\n');

    const days = parseDays(plan);
    expect(days).toHaveLength(1);
    expect(days[0].meals[0].content).toBe('Oatmeal (300 cal) - warm and hearty.');
  });

  it('returns an empty array when there is no MEAL PLAN section and no day markers', () => {
    expect(parseDays('just some unrelated text')).toEqual([]);
  });

  it('parses days even without a MEAL PLAN header, scanning the whole text', () => {
    const plan = 'Day 1\nBreakfast: Oatmeal';
    const days = parseDays(plan);
    expect(days).toHaveLength(1);
  });

  it('dedupes repeated day numbers, keeping the first occurrence', () => {
    const plan = 'MEAL PLAN\nDay 1\nBreakfast: A\nDay 1\nBreakfast: B\nDay 2\nBreakfast: C';
    const days = parseDays(plan);
    expect(days.map(d => d.day)).toEqual([1, 2]);
    expect(days[0].meals[0].content).toBe('A');
  });

  it('truncates to a maximum of 7 days', () => {
    const dayBlocks = Array.from({ length: 10 }, (_, i) => `Day ${i + 1}\nBreakfast: meal ${i + 1}`);
    const plan = 'MEAL PLAN\n' + dayBlocks.join('\n');
    const days = parseDays(plan);
    expect(days).toHaveLength(7);
    expect(days[6].day).toBe(7);
  });

  it('handles a day with no recognizable meal lines', () => {
    const plan = 'MEAL PLAN\nDay 1\njust some prose with no meal labels';
    const days = parseDays(plan);
    expect(days).toEqual([{ day: 1, meals: [] }]);
  });

  it('tolerates markdown-bold day headers', () => {
    const plan = 'MEAL PLAN\n**Day 1**\nBreakfast: Oatmeal';
    const days = parseDays(plan);
    expect(days).toHaveLength(1);
    expect(days[0].day).toBe(1);
  });
});

describe('parseRecipes', () => {
  it('parses recipes grouped by day', () => {
    const plan = [
      'RECIPES',
      'Day 1 - Breakfast: Oatmeal',
      'Ingredients:',
      '- oats',
      '- milk',
      'Steps:',
      '1. Combine oats and milk',
      '2. Microwave for 2 minutes',
      'Day 1 - Lunch: Salad',
      'Ingredients:',
      '- lettuce',
      'Steps:',
      '1. Chop lettuce',
      'SHOPPING',
      'Produce',
    ].join('\n');

    const byDay = parseRecipes(plan);
    expect(Object.keys(byDay)).toEqual(['1']);
    expect(byDay[1]).toHaveLength(2);
    expect(byDay[1][0]).toEqual({
      type: 'Breakfast',
      name: 'Oatmeal',
      ingredients: '- oats\n- milk',
      steps: '1. Combine oats and milk\n2. Microwave for 2 minutes',
    });
    expect(byDay[1][1].name).toBe('Salad');
  });

  it('returns an empty object when there is no RECIPES section', () => {
    expect(parseRecipes('MEAL PLAN\nDay 1\nBreakfast: Oatmeal')).toEqual({});
  });

  it('skips chunks that do not match the "Day N - Type: Name" header format', () => {
    const plan = 'RECIPES\nNot a valid header\nsome text\nSHOPPING';
    expect(parseRecipes(plan)).toEqual({});
  });

  it('defaults ingredients and steps to empty strings when missing', () => {
    const plan = 'RECIPES\nDay 1 - Breakfast: Oatmeal\nNo structured content here.\nSHOPPING';
    const byDay = parseRecipes(plan);
    expect(byDay[1][0]).toEqual({
      type: 'Breakfast',
      name: 'Oatmeal',
      ingredients: '',
      steps: '',
    });
  });

  it('groups multiple meals across multiple days', () => {
    const plan = [
      'RECIPES',
      'Day 1 - Breakfast: Oatmeal',
      'Ingredients:\n- oats\nSteps:\n1. cook',
      'Day 2 - Dinner: Chicken',
      'Ingredients:\n- chicken\nSteps:\n1. roast',
      'SHOPPING',
    ].join('\n');
    const byDay = parseRecipes(plan);
    expect(Object.keys(byDay).sort()).toEqual(['1', '2']);
  });
});

describe('classifyMealType', () => {
  it('classifies breakfast', () => {
    expect(classifyMealType('Breakfast')).toBe('breakfast');
  });
  it('classifies lunch', () => {
    expect(classifyMealType('Lunch')).toBe('lunch');
  });
  it('classifies snack', () => {
    expect(classifyMealType('Afternoon Snack')).toBe('snack');
  });
  it('defaults unrecognized/dinner labels to dinner', () => {
    expect(classifyMealType('Dinner')).toBe('dinner');
    expect(classifyMealType('Mystery Meal')).toBe('dinner');
  });
  it('is case-insensitive', () => {
    expect(classifyMealType('BREAKFAST')).toBe('breakfast');
  });
});
