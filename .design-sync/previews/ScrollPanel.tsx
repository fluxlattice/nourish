import {
  IndexCard,
  IngredientRow,
  RecipeBox,
  RecipeEntry,
  RecipeSectionTitle,
  ScrollPanel,
  ShoppingCategory,
  ShoppingRow,
} from "@nourish/ui";

export const RecipesInCard = () => (
  <RecipeBox>
    <IndexCard>
      <ScrollPanel>
        <RecipeEntry name="Overnight Oats with Berries" type="Breakfast">
          <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
          <IngredientRow>1/2 cup rolled oats</IngredientRow>
          <IngredientRow>1/2 cup almond milk</IngredientRow>
        </RecipeEntry>
        <RecipeEntry name="Sheet-Pan Salmon" type="Dinner">
          <RecipeSectionTitle tone="ingredients">Ingredients</RecipeSectionTitle>
          <IngredientRow>2 salmon fillets</IngredientRow>
          <IngredientRow>1 head broccoli, cut into florets</IngredientRow>
        </RecipeEntry>
      </ScrollPanel>
    </IndexCard>
  </RecipeBox>
);

export const ShoppingListPanel = () => (
  <RecipeBox>
    <IndexCard>
      <ScrollPanel size="panel">
        <ShoppingCategory>Produce</ShoppingCategory>
        <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
        <ShoppingRow>Blueberries, 1 pint — $3.99</ShoppingRow>
        <ShoppingCategory>Proteins</ShoppingCategory>
        <ShoppingRow>Salmon fillets, 4 — $16.80</ShoppingRow>
      </ScrollPanel>
    </IndexCard>
  </RecipeBox>
);
