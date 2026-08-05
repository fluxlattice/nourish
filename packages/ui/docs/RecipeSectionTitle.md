---
category: Content
---

# RecipeSectionTitle

Script sub-heading that divides a recipe, underlined in its own colour.

**The colour split carries meaning.** Herb green heads what you gather; mustard heads the method, matching the mustard numbers on `StepRow`.

```jsx
<RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
<IngredientRow>2 salmon fillets</IngredientRow>

<RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
<StepRow number={1}>Heat the oven to 200°C.</StepRow>
```

Keeping that consistent is what lets someone skim a card and find the method without reading. Don't swap the tones.
