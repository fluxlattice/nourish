---
category: Feedback
---

# LoadingView

Full-card waiting state: ring, script title, a rotating tip line, and three pulsing dots.

```jsx
<LoadingView
  title="Building your plan"
  tips={[
    "Calculating your calorie targets…",
    "Balancing your macros…",
    "Building your shopping list…",
    "Adding recipes you'll actually want to cook…",
    "Almost ready…",
  ]}
/>
```

**Name the real work in the tips.** Generic "Please wait" copy wastes the one mechanism that makes a long wait tolerable — each line reports an actual stage, so progress is legible with no percentage to show. Order them to match the real sequence and end with something that promises the finish.

Replaces the whole card body; don't render it beside the content it's waiting on. Tips cycle every 2200ms by default and loop.
