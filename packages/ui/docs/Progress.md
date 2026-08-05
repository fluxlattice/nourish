---
category: Navigation
---

# Progress

Folder-tab progress indicator: a row of small clips filled in stamp red up to the current card, over a "Card 2 of 4" counter.

```jsx
<Progress count={4} current={step} label={["Intro", "Profile", "Goals & Activity", "Budget & Diet"][step]} />
```

The tabs read as dividers poking out of the recipe box, which is why they sit **above** the card rather than inside it. `current` is zero-based.

Naming the current card in `label` is what makes the counter meaningful — "Card 2 of 4" alone says how far, not what.
