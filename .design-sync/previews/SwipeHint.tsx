import { IndexCard, RecipeBox, StepSub, SwipeHint } from "@nourish/ui";

export const BothDirections = () => (
  <RecipeBox>
    <IndexCard>
      <StepSub>A card with others on either side.</StepSub>
      <SwipeHint>← swipe →</SwipeHint>
    </IndexCard>
  </RecipeBox>
);

export const ForwardOnly = () => (
  <RecipeBox>
    <IndexCard>
      <StepSub>The first card — nothing behind it yet.</StepSub>
      <SwipeHint>swipe →</SwipeHint>
    </IndexCard>
  </RecipeBox>
);
