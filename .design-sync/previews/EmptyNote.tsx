import { EmptyNote, IndexCard, RecipeBox } from "@nourish/ui";

export const NoRecipes = () => (
  <RecipeBox>
    <IndexCard>
      <EmptyNote>Generate a new plan to see recipes here.</EmptyNote>
    </IndexCard>
  </RecipeBox>
);

export const NoMeals = () => (
  <RecipeBox>
    <IndexCard>
      <EmptyNote>No meals found for this day.</EmptyNote>
    </IndexCard>
  </RecipeBox>
);
