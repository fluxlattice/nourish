import { IndexCard, RecipeBox, RecipeSectionTitle, StepRow } from "@nourish/ui";

export const Single = () => (
  <RecipeBox>
    <IndexCard>
      <StepRow number={1}>Heat the oven to 200°C.</StepRow>
    </IndexCard>
  </RecipeBox>
);

export const Method = () => (
  <RecipeBox>
    <IndexCard>
      <RecipeSectionTitle tone="steps">Steps</RecipeSectionTitle>
      <StepRow number={1}>Heat the oven to 200°C.</StepRow>
      <StepRow number={2}>Toss the broccoli in oil and roast for 20 minutes.</StepRow>
      <StepRow number={3}>Add the salmon and roast a further 12 minutes.</StepRow>
      <StepRow number={4}>Squeeze over the lemon and serve on the quinoa.</StepRow>
    </IndexCard>
  </RecipeBox>
);
