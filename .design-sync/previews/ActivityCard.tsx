import { ActivityCard, ActivityGrid, IndexCard, RecipeBox } from "@nourish/ui";

export const Selected = () => (
  <RecipeBox>
    <IndexCard>
      <ActivityCard label="Moderately Active" description="3–4 workouts/week" selected />
    </IndexCard>
  </RecipeBox>
);

export const Unselected = () => (
  <RecipeBox>
    <IndexCard>
      <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
    </IndexCard>
  </RecipeBox>
);

export const InAGrid = () => (
  <RecipeBox>
    <IndexCard>
      <ActivityGrid>
        <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
        <ActivityCard label="Lightly Active" description="1–2 workouts/week" />
        <ActivityCard label="Moderately Active" description="3–4 workouts/week" selected />
        <ActivityCard label="Very Active" description="Daily intense exercise" />
      </ActivityGrid>
    </IndexCard>
  </RecipeBox>
);
