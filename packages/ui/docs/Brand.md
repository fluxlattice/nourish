---
category: Layout
---

# Brand

The product lockup: the name in Dancing Script at 44px over a small tracked tagline, in warm page ink against the tabletop.

Sits directly inside `Page`, **above** the `RecipeBox` — not inside it.

```jsx
<Page>
  <Brand name="Nourish" tagline="Personalized meal planning" />
  <RecipeBox>{/* … */}</RecipeBox>
</Page>
```

There is deliberately no logo mark, badge or emoji here — the script wordmark is the brand. An earlier version had a circular leaf badge and it was removed; don't put one back.
