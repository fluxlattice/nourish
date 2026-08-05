import { CardStack, IndexCard, LoadingView, RecipeBox } from "@nourish/ui";

export const BuildingPlan = () => (
  <RecipeBox>
    <CardStack>
      <IndexCard>
        <LoadingView
          title="Building your plan"
          tips={[
            "Calculating your calorie targets…",
            "Balancing your macros…",
            "Building your shopping list…",
            "Adding recipes you'll actually want to cook…",
            "Almost ready…",
          ]}
        />
      </IndexCard>
    </CardStack>
  </RecipeBox>
);

export const SingleTip = () => (
  <RecipeBox>
    <IndexCard>
      <LoadingView title="Fetching prices" tips={["Checking local grocery prices…"]} />
    </IndexCard>
  </RecipeBox>
);
