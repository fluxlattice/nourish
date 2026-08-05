import { ActivityCard, ActivityGrid, FieldLabel, IndexCard, RecipeBox } from "@nourish/ui";

export const LabelledGrid = () => (
  <RecipeBox>
    <IndexCard>
      <FieldLabel>Activity Level</FieldLabel>
      <ActivityGrid>
        <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
        <ActivityCard label="Lightly Active" description="1–2 workouts/week" />
        <ActivityCard label="Moderately Active" description="3–4 workouts/week" selected />
        <ActivityCard label="Very Active" description="Daily intense exercise" />
      </ActivityGrid>
    </IndexCard>
  </RecipeBox>
);

export const TwoUp = () => (
  <RecipeBox>
    <IndexCard>
      <ActivityGrid>
        <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
        <ActivityCard label="Very Active" description="Daily intense exercise" selected />
      </ActivityGrid>
    </IndexCard>
  </RecipeBox>
);
