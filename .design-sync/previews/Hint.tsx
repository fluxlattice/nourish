import { Hint, IndexCard, RecipeBox, TextField } from "@nourish/ui";

export const UnderAField = () => (
  <RecipeBox>
    <IndexCard>
      <TextField
        label="Monthly Food Budget ($)"
        type="number"
        value="320"
        hint="≈ $80/week · ≈ $11/day"
      />
    </IndexCard>
  </RecipeBox>
);

export const Standalone = () => (
  <RecipeBox>
    <IndexCard>
      <Hint>≈ $80/week · ≈ $11/day</Hint>
    </IndexCard>
  </RecipeBox>
);
