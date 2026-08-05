import { GoalCard, IndexCard, RecipeBox } from "@nourish/ui";

export const Selected = () => (
  <RecipeBox>
    <IndexCard>
      <GoalCard icon="🔥" label="Lose Weight" description="Calorie deficit, high protein" selected />
    </IndexCard>
  </RecipeBox>
);

export const Unselected = () => (
  <RecipeBox>
    <IndexCard>
      <GoalCard icon="⚖️" label="Stay Balanced" description="Sustainable healthy habits" />
    </IndexCard>
  </RecipeBox>
);

export const GoalStack = () => (
  <RecipeBox>
    <IndexCard>
      <GoalCard icon="🔥" label="Lose Weight" description="Calorie deficit, high protein" selected />
      <GoalCard icon="⚖️" label="Stay Balanced" description="Sustainable healthy habits" />
      <GoalCard icon="💪" label="Build Muscle" description="Calorie surplus, protein-rich" />
    </IndexCard>
  </RecipeBox>
);
