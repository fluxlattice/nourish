import { FieldPair, IndexCard, RecipeBox, SelectField, TextField } from "@nourish/ui";

export const ProfileFields = () => (
  <RecipeBox>
    <IndexCard>
      <FieldPair>
        <TextField label="Age" type="number" value="34" />
        <SelectField
          label="Gender"
          value="female"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "other", label: "Other" },
          ]}
        />
        <TextField label="Weight (lbs)" type="number" value="165" />
        <TextField label="Height (in)" type="number" value="68" />
      </FieldPair>
    </IndexCard>
  </RecipeBox>
);

export const EmptyFields = () => (
  <RecipeBox>
    <IndexCard>
      <FieldPair>
        <TextField label="Age" type="number" placeholder="28" />
        <TextField label="Weight (lbs)" type="number" placeholder="160" />
      </FieldPair>
    </IndexCard>
  </RecipeBox>
);
