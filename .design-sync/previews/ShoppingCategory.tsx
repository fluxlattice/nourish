import { IndexCard, RecipeBox, ShoppingCategory, ShoppingRow } from "@nourish/ui";

export const Produce = () => (
  <RecipeBox>
    <IndexCard>
      <ShoppingCategory>Produce</ShoppingCategory>
      <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
      <ShoppingRow>Sweet potatoes, 3 lbs — $4.20</ShoppingRow>
    </IndexCard>
  </RecipeBox>
);

export const TwoCategories = () => (
  <RecipeBox>
    <IndexCard>
      <ShoppingCategory>Grains &amp; Pantry</ShoppingCategory>
      <ShoppingRow>Rolled oats, 42oz — $4.99</ShoppingRow>
      <ShoppingCategory>Dairy &amp; Alternatives</ShoppingCategory>
      <ShoppingRow>Almond milk, half gallon — $3.79</ShoppingRow>
    </IndexCard>
  </RecipeBox>
);
