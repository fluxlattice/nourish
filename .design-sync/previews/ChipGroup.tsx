import { Chip, ChipGroup, FieldLabel, IndexCard, RecipeBox } from "@nourish/ui";

export const DietaryRestrictions = () => (
  <RecipeBox>
    <IndexCard>
      <FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
      <ChipGroup>
        <Chip label="Gluten-Free" />
        <Chip label="Dairy-Free" />
        <Chip label="Vegan" selected />
        <Chip label="Vegetarian" />
        <Chip label="Keto" />
        <Chip label="Paleo" />
        <Chip label="Nut-Free" selected />
        <Chip label="Low Sodium" />
      </ChipGroup>
    </IndexCard>
  </RecipeBox>
);
