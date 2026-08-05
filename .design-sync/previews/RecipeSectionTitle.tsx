import {
  IndexCard,
  IngredientRow,
  RecipeBox,
  RecipeSectionTitle,
  StepRow,
} from "@nourish/ui";

export const Ingredients = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
      <IngredientRow>1/2 cup rolled oats</IngredientRow>
      <IngredientRow>1 tbsp chia seeds</IngredientRow>
    </IndexCard>
  </RecipeBox>
);

export const Steps = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
      <StepRow number={1}>Stir the oats and chia together in a jar.</StepRow>
      <StepRow number={2}>Cover and refrigerate overnight.</StepRow>
    </IndexCard>
  </RecipeBox>
);

export const BothTones = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
      <IngredientRow>2 salmon fillets</IngredientRow>
      <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
      <StepRow number={1}>Heat the oven to 200°C.</StepRow>
    </IndexCard>
  </RecipeBox>
);
