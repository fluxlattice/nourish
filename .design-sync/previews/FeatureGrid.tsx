import { FeatureGrid, IndexCard, RecipeBox, StepTitle } from "@nourish/ui";

export const WelcomeRow = () => (
  <RecipeBox>
    <IndexCard>
      <FeatureGrid labels={["Goal-based", "Budget-aware", "Diet-friendly"]} />
    </IndexCard>
  </RecipeBox>
);

export const UnderATitle = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Welcome to Nourish</StepTitle>
      <FeatureGrid labels={["Goal-based", "Budget-aware", "Diet-friendly"]} />
    </IndexCard>
  </RecipeBox>
);
