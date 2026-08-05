import {
  ActivityCard,
  ActivityGrid,
  Chip,
  ChipGroup,
  FieldLabel,
  IndexCard,
  RecipeBox,
} from "@nourish/ui";

export const Alone = () => (
  <RecipeBox>
    <IndexCard>
      <FieldLabel>Activity Level</FieldLabel>
    </IndexCard>
  </RecipeBox>
);

export const LabellingAGrid = () => (
  <RecipeBox>
    <IndexCard>
      <FieldLabel>Activity Level</FieldLabel>
      <ActivityGrid>
        <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
        <ActivityCard label="Very Active" description="Daily intense exercise" selected />
      </ActivityGrid>
    </IndexCard>
  </RecipeBox>
);

export const LabellingChips = () => (
  <RecipeBox>
    <IndexCard>
      <FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
      <ChipGroup>
        <Chip label="Vegan" selected />
        <Chip label="Keto" />
      </ChipGroup>
    </IndexCard>
  </RecipeBox>
);
