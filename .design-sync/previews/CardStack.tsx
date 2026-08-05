import { CardStack, IndexCard, RecipeBox, StepSub, StepTitle } from "@nourish/ui";

export const Stacked = () => (
  <RecipeBox>
    <CardStack>
      <IndexCard>
        <StepTitle>Diet &amp; Budget</StepTitle>
        <StepSub>Customize your plan to fit your lifestyle.</StepSub>
      </IndexCard>
    </CardStack>
  </RecipeBox>
);

export const WithoutStack = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Diet &amp; Budget</StepTitle>
      <StepSub>A single card, with no others behind it.</StepSub>
    </IndexCard>
  </RecipeBox>
);
