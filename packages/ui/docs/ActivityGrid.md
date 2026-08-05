---
category: Actions
---

# ActivityGrid

Two-column grid for `ActivityCard` tiles.

```jsx
<ActivityGrid>
  <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
  <ActivityCard label="Lightly Active" description="1–2 workouts/week" />
  <ActivityCard label="Moderately Active" description="3–4 workouts/week" selected />
  <ActivityCard label="Very Active" description="Daily intense exercise" />
</ActivityGrid>
```

Tighter gaps than `FieldPair`, because these tiles are a single choice set rather than separate fields.
