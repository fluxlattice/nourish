import { Chip, ChipGroup, IndexCard, RecipeBox } from "@nourish/ui";

export const Unselected = () => (
  <RecipeBox>
    <IndexCard>
      <Chip label="Gluten-Free" />
    </IndexCard>
  </RecipeBox>
);

export const Selected = () => (
  <RecipeBox>
    <IndexCard>
      <Chip label="Vegan" selected />
    </IndexCard>
  </RecipeBox>
);

export const InAGroup = () => (
  <RecipeBox>
    <IndexCard>
      <ChipGroup>
        <Chip label="Gluten-Free" />
        <Chip label="Dairy-Free" />
        <Chip label="Vegan" selected />
        <Chip label="Keto" selected />
        <Chip label="Nut-Free" />
      </ChipGroup>
    </IndexCard>
  </RecipeBox>
);
