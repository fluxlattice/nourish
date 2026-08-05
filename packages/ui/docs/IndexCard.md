---
category: Layout
---

# IndexCard

The cream index card: ruled blue lines, a red margin rule down the left edge, and a faint paper grain. The surface all written content sits on.

```jsx
<CardStack>
  <IndexCard>
    <StepTitle>Diet &amp; Budget</StepTitle>
    <StepSub>Customize your plan to fit your lifestyle.</StepSub>
    <FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
    <ChipGroup>
      <Chip label="Vegan" selected />
      <Chip label="Keto" />
    </ChipGroup>
  </IndexCard>
</CardStack>
```

**Body copy must use `line-height: var(--rule-line)`** so text sits *on* the blue rules instead of drifting between them. `StepSub`, `MealRow` and the checklist rows already do this — if you add your own paragraph, match it or the illusion breaks.

Left padding clears the red margin rule; don't reduce it. Pass drag transforms through `style` if you wire up swipe gestures.
