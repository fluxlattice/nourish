import { IndexCard, Polaroid, RecipeBox } from "@nourish/ui";

export const FallbackBreakfast = () => (
  <RecipeBox>
    <IndexCard>
      <Polaroid type="breakfast" fallbackIcon="☀️" />
    </IndexCard>
  </RecipeBox>
);

export const Loading = () => (
  <RecipeBox>
    <IndexCard>
      <Polaroid loading />
    </IndexCard>
  </RecipeBox>
);

export const TiltAndSize = () => (
  <RecipeBox>
    <IndexCard>
      <div style={{ display: "flex", gap: "16px" }}>
        <Polaroid type="lunch" fallbackIcon="🌤" tilt="left" />
        <Polaroid type="dinner" fallbackIcon="🌙" tilt="right" />
        <Polaroid type="snack" fallbackIcon="🍎" tilt="left" size="lg" />
      </div>
    </IndexCard>
  </RecipeBox>
);
