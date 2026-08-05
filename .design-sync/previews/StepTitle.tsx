import { IndexCard, RecipeBox, StepSub, StepTitle } from "@nourish/ui";

export const Default = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Your goal &amp; activity</StepTitle>
    </IndexCard>
  </RecipeBox>
);

export const WithSub = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>About you</StepTitle>
      <StepSub>Used to calculate your ideal calorie targets.</StepSub>
    </IndexCard>
  </RecipeBox>
);

export const ShortTitle = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Diet &amp; Budget</StepTitle>
    </IndexCard>
  </RecipeBox>
);
