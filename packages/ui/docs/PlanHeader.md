---
category: Plan
---

# PlanHeader

Header for a finished plan: a green "plan ready" pill, the plan name in large script, and a row of small stat pills.

```jsx
<PlanHeader
  badge="✓ Plan ready"
  title="Your Weight Loss Plan"
  stats={[`$${budget}/month`, `${meals} meals/day`]}
/>
```

Sits on the tabletop **above** the recipe box, not on a card — which is why its type is warm page ink (`--box-ink`, `--page-ink`) rather than dark ink.

It announces the thing the user has been waiting for, so keep the badge rare and the stats to two or three short facts.
