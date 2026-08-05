import { Actions, Button, RecipeBox } from "@nourish/ui";

export const NavRow = () => (
  <RecipeBox>
    <Actions>
      <Button variant="ghost">← Back</Button>
      <Button>Continue →</Button>
    </Actions>
  </RecipeBox>
);

export const NavRowBlocked = () => (
  <RecipeBox>
    <Actions>
      <Button variant="ghost">← Back</Button>
      <Button disabled>Stamp my plan →</Button>
    </Actions>
  </RecipeBox>
);

export const SplitGrid = () => (
  <RecipeBox>
    <Actions layout="grid">
      <Button variant="ghost">← Start Over</Button>
      <Button>↓ Download</Button>
    </Actions>
  </RecipeBox>
);
