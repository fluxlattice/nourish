---
category: Content
---

# StepRow

One numbered instruction in a recipe method, its number in a dashed mustard circle set in the script face.

```jsx
<RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
<StepRow number={1}>Heat the oven to 200°C.</StepRow>
<StepRow number={2}>Toss the broccoli in oil and roast for 20 minutes.</StepRow>
<StepRow number={3}>Add the salmon and roast a further 12 minutes.</StepRow>
```

Mustard here deliberately pairs with the mustard `RecipeSectionTitle` above, so the whole method reads as one keyed region distinct from the green ingredients.

Number from 1 and pass it explicitly; the component doesn't count for you.
