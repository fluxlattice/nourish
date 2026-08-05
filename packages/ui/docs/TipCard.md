---
category: Content
---

# TipCard

A single piece of advice on a mustard sticky note, rotated slightly — and alternating rotation down a list, so a run of tips looks stuck on by hand.

```jsx
<TipCard number={1}>
  Buy frozen berries instead of fresh — about a third of the price and they work
  just as well in overnight oats.
</TipCard>
```

Unlike `StepRow`, a tip is standalone: the number orders the list, it doesn't imply the reader works through them in sequence.

Tips are specific to the user's own goal, budget and restrictions. A generic tip is worse than none — it tells the reader the advice wasn't really theirs.
