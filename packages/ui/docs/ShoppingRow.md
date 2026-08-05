---
category: Content
---

# ShoppingRow

One shopping-list entry with a small tilted checkbox — the item and its estimated cost.

```jsx
<ScrollPanel size="panel">
  <ShoppingCategory>Produce</ShoppingCategory>
  <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
  <ShoppingRow>Blueberries, 1 pint — $3.99</ShoppingRow>
</ScrollPanel>
```

Group runs of these under a `ShoppingCategory`. The checkbox tilts the opposite way to `IngredientRow`'s, which keeps a long list from looking mechanically repeated.

Entries carry their estimated cost after an em dash — the plan is budget-aware, and the prices are the point.
