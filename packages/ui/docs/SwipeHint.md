---
category: Navigation
---

# SwipeHint

Small right-aligned affordance at the foot of a swipeable `IndexCard`.

```jsx
<IndexCard>
  {/* … */}
  {(hasPrev || hasNext) && (
    <SwipeHint>{hasPrev ? "← " : ""}swipe{hasNext ? " →" : ""}</SwipeHint>
  )}
</IndexCard>
```

Show only the directions that actually work, so the hint never promises a card that isn't there. On a card with nothing either side, render nothing at all.
