import { DayHeading, IndexCard, MealRow, Polaroid, RecipeBox } from "@nourish/ui";

export const Breakfast = () => (
  <RecipeBox>
    <IndexCard>
      <MealRow type="Breakfast" photo={<Polaroid type="breakfast" fallbackIcon="☀️" />}>
        Greek yogurt parfait with berries and granola (380 cal)
      </MealRow>
    </IndexCard>
  </RecipeBox>
);

export const FullDay = () => (
  <RecipeBox>
    <IndexCard>
      <DayHeading>Day 3</DayHeading>
      <MealRow
        type="Breakfast"
        photo={<Polaroid type="breakfast" fallbackIcon="☀️" tilt="left" />}
      >
        Greek yogurt parfait with berries and granola (380 cal)
      </MealRow>
      <MealRow type="Lunch" photo={<Polaroid type="lunch" fallbackIcon="🌤" tilt="right" />}>
        Chickpea and roasted vegetable grain bowl with tahini (520 cal)
      </MealRow>
      <MealRow type="Dinner" photo={<Polaroid type="dinner" fallbackIcon="🌙" tilt="left" />}>
        Sheet-pan salmon with roasted broccoli and quinoa (610 cal)
      </MealRow>
    </IndexCard>
  </RecipeBox>
);
