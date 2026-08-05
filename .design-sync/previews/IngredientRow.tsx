import { IndexCard, IngredientRow, RecipeBox, RecipeSectionTitle } from "@nourish/ui";

export const Single = () => (
  <RecipeBox>
    <IndexCard>
      <IngredientRow>1/2 cup rolled oats</IngredientRow>
    </IndexCard>
  </RecipeBox>
);

export const IngredientList = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
      <IngredientRow>2 salmon fillets (about 150g each)</IngredientRow>
      <IngredientRow>1 head broccoli, cut into florets</IngredientRow>
      <IngredientRow>2 tbsp olive oil</IngredientRow>
      <IngredientRow>1 lemon, halved</IngredientRow>
    </IndexCard>
  </RecipeBox>
);
