import {
  Brand,
  Button,
  CardStack,
  IndexCard,
  Progress,
  RecipeBox,
  StepSub,
  StepTitle,
  WelcomeGreeting,
} from "@nourish/ui";

export const WelcomeScreen = () => (
  <>
    <Brand name="Nourish" tagline="Personalized meal planning" />
    <RecipeBox>
      <Progress count={4} current={0} label="Intro" />
      <CardStack>
        <IndexCard>
          <WelcomeGreeting>Hello,</WelcomeGreeting>
          <StepTitle>Welcome to Nourish</StepTitle>
          <StepSub>
            Answer 4 quick questions and get a fully personalized 7-day meal plan with
            recipes, a shopping list, and tips tailored to your budget and goals.
          </StepSub>
          <Button>Get Started →</Button>
        </IndexCard>
      </CardStack>
    </RecipeBox>
  </>
);
