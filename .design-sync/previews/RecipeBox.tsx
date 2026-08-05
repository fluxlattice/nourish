import {
  Actions,
  Button,
  CardStack,
  IndexCard,
  Progress,
  RecipeBox,
  StepSub,
  StepTitle,
} from "@nourish/ui";

export const WithCardAndActions = () => (
  <RecipeBox>
    <Progress count={4} current={1} label="Profile" />
    <CardStack>
      <IndexCard>
        <StepTitle>About you</StepTitle>
        <StepSub>Used to calculate your ideal calorie targets.</StepSub>
      </IndexCard>
    </CardStack>
    <Actions>
      <Button variant="ghost">← Back</Button>
      <Button>Continue →</Button>
    </Actions>
  </RecipeBox>
);

export const Empty = () => (
  <RecipeBox>
    <CardStack>
      <IndexCard>
        <StepTitle>A blank card</StepTitle>
      </IndexCard>
    </CardStack>
  </RecipeBox>
);
