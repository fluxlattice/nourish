import { IndexCard, RecipeBox, StepSub, StepTitle } from "@nourish/ui";

export const Short = () => (
  <RecipeBox>
    <IndexCard>
      <StepSub>We'll tailor your entire plan around this.</StepSub>
    </IndexCard>
  </RecipeBox>
);

export const OnTheRules = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Welcome to Nourish</StepTitle>
      <StepSub>
        Answer 4 quick questions and get a fully personalized 7-day meal plan with
        recipes, a shopping list, and tips tailored to your budget and goals.
      </StepSub>
    </IndexCard>
  </RecipeBox>
);
