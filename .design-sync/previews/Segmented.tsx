import { IndexCard, RecipeBox, Segmented } from "@nourish/ui";

const DAY_TABS = [
  { id: "meals", label: "🍽 Meals" },
  { id: "recipes", label: "📖 Recipes" },
];

export const MealsActive = () => (
  <RecipeBox>
    <IndexCard>
      <Segmented items={DAY_TABS} value="meals" />
    </IndexCard>
  </RecipeBox>
);

export const RecipesActive = () => (
  <RecipeBox>
    <IndexCard>
      <Segmented items={DAY_TABS} value="recipes" />
    </IndexCard>
  </RecipeBox>
);

export const PlanLevel = () => (
  <RecipeBox>
    <IndexCard>
      <Segmented
        items={[
          { id: "shopping", label: "🛒 Shopping" },
          { id: "tips", label: "💡 Tips" },
        ]}
        value="shopping"
      />
    </IndexCard>
  </RecipeBox>
);
