---
category: Typography
---

# Hint

Derived-value note under an input, in faint ink.

```jsx
<TextField
  label="Monthly Food Budget ($)"
  type="number"
  value={budget}
  onChange={setBudget}
  hint={budget ? `≈ $${Math.round(budget / 4)}/week · ≈ $${Math.round(budget / 30)}/day` : undefined}
/>
```

For computed feedback — showing the user what their number *means* — not for validation errors.

`TextField` renders it from the `hint` prop; use the standalone component only under a custom control. Render it conditionally: an empty hint leaves a gap that makes the card jump when it fills.
