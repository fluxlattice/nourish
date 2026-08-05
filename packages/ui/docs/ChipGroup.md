---
category: Forms
---

# ChipGroup

Wrapping flex row for `Chip` toggles.

```jsx
<FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
<ChipGroup>
  <Chip label="Gluten-Free" />
  <Chip label="Vegan" selected />
  <Chip label="Keto" />
</ChipGroup>
```

Chips carry no label of their own, so label the group with a `FieldLabel` above it — and put the selection rule ("select all that apply") in that label.

Built for a dozen short options, not a handful of long ones.
