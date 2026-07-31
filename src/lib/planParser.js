export function getSection(plan, key, next) {
  const i = plan.indexOf(key);
  if (i === -1) return "";
  const start = i + key.length;
  const j = next ? plan.indexOf(next, start) : plan.length;
  return (j === -1 ? plan.slice(start) : plan.slice(start, j)).trim();
}

export function parseDays(plan) {
  const days = [];
  const mealSection = (() => {
    const i = plan.indexOf("MEAL PLAN");
    const j = plan.indexOf("RECIPES");
    const k = plan.indexOf("SHOPPING");
    const end = j !== -1 ? j : k !== -1 ? k : plan.length;
    return i === -1 ? plan : plan.slice(i + 9, end);
  })();
  const parts = mealSection.split(/(?=\*{0,2}Day \d+\*{0,2}[:\s-])/i).filter(p => p.trim());
  parts.forEach(part => {
    const titleMatch = part.match(/Day (\d+)/i);
    if (!titleMatch) return;
    const dayNum = parseInt(titleMatch[1]);
    const lines = part.split("\n").filter(l => l.trim());
    const meals = [];
    let currentMeal = null;
    lines.slice(1).forEach(line => {
      const l = line.trim();
      if (!l) return;
      if (/^(breakfast|lunch|dinner|snack)/i.test(l)) {
        if (currentMeal) meals.push(currentMeal);
        currentMeal = { type: l.split(/[:-]/)[0].trim(), content: l.replace(/^[^:-]+[:-]\s*/, "") };
      } else if (currentMeal) {
        currentMeal.content += " " + l;
      }
    });
    if (currentMeal) meals.push(currentMeal);
    days.push({ day: dayNum, meals });
  });
  const seen = new Set();
  return days.filter(d => {
    if (seen.has(d.day)) return false;
    seen.add(d.day);
    return true;
  }).slice(0, 7);
}

export function parseRecipes(plan) {
  const recipesRawText = getSection(plan, "RECIPES", "SHOPPING");
  const byDay = {};

  const chunks = recipesRawText.split(/(?=Day \d+ - )/i).filter(p => p.trim());

  chunks.forEach(chunk => {
    const headerMatch = chunk.match(/Day (\d+) - ([^:]+):\s*([^\n]+)/i);
    if (!headerMatch) return;
    const dayNum = parseInt(headerMatch[1]);
    const mealType = headerMatch[2].trim();
    const mealName = headerMatch[3].trim();
    const ingMatch = chunk.match(/Ingredients?:\s*([\s\S]+?)(?=Steps?:|$)/i);
    const stepsMatch = chunk.match(/Steps?:\s*([\s\S]+?)(?=Day \d+ -|$)/i);
    if (!byDay[dayNum]) byDay[dayNum] = [];
    byDay[dayNum].push({
      type: mealType,
      name: mealName,
      ingredients: ingMatch ? ingMatch[1].trim() : "",
      steps: stepsMatch ? stepsMatch[1].trim() : ""
    });
  });

  return byDay;
}

export function classifyMealType(type) {
  const t = type.toLowerCase();
  if (t.includes("breakfast")) return "breakfast";
  if (t.includes("lunch")) return "lunch";
  if (t.includes("snack")) return "snack";
  return "dinner";
}
