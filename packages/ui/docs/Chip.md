---
category: Forms
---

# Chip

Pill-shaped multi-select toggle — any number can be active at once.

```jsx
<FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
<ChipGroup>
  {DIETARY.map((d) => (
    <Chip
      key={d.id}
      label={d.label}
      selected={restrictions.includes(d.id)}
      onClick={() => toggle(d.id)}
    />
  ))}
</ChipGroup>
```

Unselected chips have a **dashed** border; selecting one makes it solid, herb green and bold. That dashed-to-solid shift is this system's selection idiom and it recurs on `GoalCard` and `ActivityCard`.

**Text only — no icons.** Decorative emoji were deliberately removed from the chips in this design; don't reintroduce them.

For picking exactly one, use `GoalCard` (needs explaining) or `ActivityCard` (terse, in a grid).
