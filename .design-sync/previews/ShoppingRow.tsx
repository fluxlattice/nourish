import { IndexCard, RecipeBox, ShoppingCategory, ShoppingRow } from "@nourish/ui";

export const Single = () => (
  <RecipeBox>
    <IndexCard>
      <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
    </IndexCard>
  </RecipeBox>
);

export const CategorisedList = () => (
  <RecipeBox>
    <IndexCard>
      <ShoppingCategory>Produce</ShoppingCategory>
      <ShoppingRow>Spinach, 2 bunches — $4.50</ShoppingRow>
      <ShoppingRow>Blueberries, 1 pint — $3.99</ShoppingRow>
      <ShoppingCategory>Proteins</ShoppingCategory>
      <ShoppingRow>Salmon fillets, 4 — $16.80</ShoppingRow>
      <ShoppingRow>Greek yogurt, 32oz — $5.49</ShoppingRow>
    </IndexCard>
  </RecipeBox>
);
