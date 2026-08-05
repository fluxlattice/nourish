import { Actions, Button, IndexCard, RecipeBox } from "@nourish/ui";

export const PrimaryStamp = () => (
  <RecipeBox>
    <IndexCard>
      <Button>Stamp my plan →</Button>
    </IndexCard>
  </RecipeBox>
);

export const Ghost = () => (
  <RecipeBox>
    <IndexCard>
      <Button variant="ghost">← Back</Button>
    </IndexCard>
  </RecipeBox>
);

export const DisabledPrimary = () => (
  <RecipeBox>
    <Button disabled>Stamp my plan →</Button>
  </RecipeBox>
);

export const InAFooter = () => (
  <RecipeBox>
    <Actions>
      <Button variant="ghost">← Back</Button>
      <Button>Continue →</Button>
    </Actions>
  </RecipeBox>
);
