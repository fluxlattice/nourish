---
category: Actions
---

# GoalCard

Full-width single-select row: a tilted round icon chip, the goal in script, a small description, and a green check when active.

```jsx
{GOALS.map((g) => (
  <GoalCard
    key={g.id}
    icon={g.icon}
    label={g.label}
    description={g.desc}
    selected={goal === g.id}
    onClick={() => setGoal(g.id)}
  />
))}
```

Use it when **each option needs explaining** — Nourish stacks three for the goal choice, the decision that shapes the whole plan.

Descriptions are fragments naming the mechanism ("Calorie deficit, high protein"), not sentences. Three or four options is the comfortable maximum.

The icon chip is the one place a glyph survives in this design; it's tilted to match the paper feel.
