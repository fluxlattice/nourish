---
category: Layout
---

# CardStack

Renders two rotated cards peeking out behind its child, so the card on top reads as the front of a stack rather than a lone panel.

```jsx
<CardStack>
  <IndexCard>
    <StepTitle>About you</StepTitle>
    <StepSub>Used to calculate your ideal calorie targets.</StepSub>
  </IndexCard>
</CardStack>
```

This is what sells the recipe-box metaphor. Use it whenever the card is one of several — a step in the flow, a day in a plan. A single standalone card can go without.

The peeks are decorative and hidden from assistive technology.
