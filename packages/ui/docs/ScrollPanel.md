---
category: Layout
---

# ScrollPanel

Height-capped scrolling region for long content — a day's recipes, a shopping list, a run of tips.

```jsx
<ScrollPanel>
  {recipes.map((r) => <RecipeEntry key={r.name} name={r.name} type={r.type} />)}
</ScrollPanel>

<ScrollPanel size="panel">
  <ShoppingCategory>Produce</ShoppingCategory>
  <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
</ScrollPanel>
```

`card` (default, 380px) for content inside an index card; `panel` (340px) for a shopping list; `tips` (340px) for a run of tips. `panel` and `tips` are the same height and differ only in which stylesheet hooks reach their children — a plain paragraph inside `tips` gets the muted treatment, so use the matching one.

The caps exist so the recipe box keeps its shape as content grows — an uncapped list makes the box stretch to whatever length the model returned.
