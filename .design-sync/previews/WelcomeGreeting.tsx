import {
  FeatureGrid,
  IndexCard,
  RecipeBox,
  StepSub,
  StepTitle,
  WelcomeGreeting,
} from "@nourish/ui";

export const AboveTitle = () => (
  <RecipeBox>
    <IndexCard>
      <WelcomeGreeting>Hello,</WelcomeGreeting>
      <StepTitle>Welcome to Nourish</StepTitle>
      <StepSub>Answer 4 quick questions and get a personalized 7-day meal plan.</StepSub>
    </IndexCard>
  </RecipeBox>
);

export const FullWelcomeCard = () => (
  <RecipeBox>
    <IndexCard>
      <WelcomeGreeting>Hello,</WelcomeGreeting>
      <StepTitle>Welcome to Nourish</StepTitle>
      <StepSub>
        Answer 4 quick questions and get a fully personalized 7-day meal plan with
        recipes, a shopping list, and tips tailored to your budget and goals.
      </StepSub>
      <FeatureGrid labels={["Goal-based", "Budget-aware", "Diet-friendly"]} />
    </IndexCard>
  </RecipeBox>
);
