import { IndexCard, LoadingRing, RecipeBox } from "@nourish/ui";

export const Default = () => (
  <RecipeBox>
    <IndexCard>
      <LoadingRing />
    </IndexCard>
  </RecipeBox>
);

export const CustomGlyph = () => (
  <RecipeBox>
    <IndexCard>
      <LoadingRing glyph="🥕" />
    </IndexCard>
  </RecipeBox>
);
