---
category: Content
---

# RecipeEntry

A full recipe written onto the card: a large polaroid beside the meal slot and dish name, then whatever sections you compose below.

```jsx
<RecipeEntry
  name="Overnight Oats with Berries"
  type="Breakfast"
  photo={<Polaroid src={url} size="lg" type="breakfast" fallbackIcon="☀️" />}
>
  <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
  <IngredientRow>1/2 cup rolled oats</IngredientRow>
  <IngredientRow>1/2 cup almond milk</IngredientRow>

  <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
  <StepRow number={1}>Stir the oats and milk together in a jar.</StepRow>
  <StepRow number={2}>Cover and refrigerate overnight.</StepRow>
</RecipeEntry>
```

Entries are separated by a dashed rule rather than boxed — several recipes read as successive entries on one card, not a stack of panels.
