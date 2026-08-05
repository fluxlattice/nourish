import { FieldPair, IndexCard, RecipeBox, TextField } from "@nourish/ui";

export const Empty = () => (
  <RecipeBox>
    <IndexCard>
      <TextField label="Monthly Food Budget ($)" type="number" placeholder="300" />
    </IndexCard>
  </RecipeBox>
);

export const Filled = () => (
  <RecipeBox>
    <IndexCard>
      <TextField label="Age" type="number" value="34" />
    </IndexCard>
  </RecipeBox>
);

export const WithHint = () => (
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

export const Paired = () => (
  <RecipeBox>
    <IndexCard>
      <FieldPair>
        <TextField label="Weight (lbs)" type="number" value="165" />
        <TextField label="Height (in)" type="number" value="68" />
      </FieldPair>
    </IndexCard>
  </RecipeBox>
);
