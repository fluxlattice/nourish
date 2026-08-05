import { IndexCard, RecipeBox, SelectField } from "@nourish/ui";

const SKILLS = [
  { value: "beginner", label: "Beginner — quick simple meals" },
  { value: "intermediate", label: "Intermediate — comfortable cooking" },
  { value: "advanced", label: "Advanced — love to cook" },
];

export const CookingSkill = () => (
  <RecipeBox>
    <IndexCard>
      <SelectField label="Cooking Skill" value="beginner" options={SKILLS} />
    </IndexCard>
  </RecipeBox>
);

export const MealsPerDay = () => (
  <RecipeBox>
    <IndexCard>
      <SelectField
        label="Meals Per Day"
        value="3"
        options={[
          { value: "2", label: "2 meals" },
          { value: "3", label: "3 meals" },
          { value: "3+", label: "3 meals + snacks" },
        ]}
      />
    </IndexCard>
  </RecipeBox>
);
