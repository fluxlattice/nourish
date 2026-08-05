import {
  IndexCard,
  IngredientRow,
  Polaroid,
  RecipeBox,
  RecipeEntry,
  RecipeSectionTitle,
  StepRow,
} from "@nourish/ui";

export const FullRecipe = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeEntry
        name="Overnight Oats with Berries"
        type="Breakfast"
        photo={<Polaroid size="lg" type="breakfast" fallbackIcon="☀️" />}
      >
        <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
        <IngredientRow>1/2 cup rolled oats</IngredientRow>
        <IngredientRow>1/2 cup almond milk</IngredientRow>
        <IngredientRow>1 tbsp chia seeds</IngredientRow>

        <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
        <StepRow number={1}>Stir the oats, milk and chia together in a jar.</StepRow>
        <StepRow number={2}>Cover and refrigerate overnight.</StepRow>
        <StepRow number={3}>Top with berries before serving.</StepRow>
      </RecipeEntry>
    </IndexCard>
  </RecipeBox>
);

export const IngredientsOnly = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeEntry
        name="Sheet-Pan Salmon &amp; Broccoli"
        type="Dinner"
        photo={<Polaroid size="lg" type="dinner" fallbackIcon="🌙" tilt="right" />}
      >
        <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
        <IngredientRow>2 salmon fillets (about 150g each)</IngredientRow>
        <IngredientRow>1 head broccoli, cut into florets</IngredientRow>
        <IngredientRow>2 tbsp olive oil</IngredientRow>
      </RecipeEntry>
    </IndexCard>
  </RecipeBox>
);
