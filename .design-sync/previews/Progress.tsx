import { Progress, RecipeBox } from "@nourish/ui";

const STEPS = ["Intro", "Profile", "Goals & Activity", "Budget & Diet"];

export const FirstCard = () => (
  <RecipeBox>
    <Progress count={4} current={0} label={STEPS[0]} />
  </RecipeBox>
);

export const MidFlow = () => (
  <RecipeBox>
    <Progress count={4} current={2} label={STEPS[2]} />
  </RecipeBox>
);

export const LastCard = () => (
  <RecipeBox>
    <Progress count={4} current={3} label={STEPS[3]} />
  </RecipeBox>
);
