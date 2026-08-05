import { DayHeading, IndexCard, MealRow, Polaroid, RecipeBox } from "@nourish/ui";

export const AboveMeals = () => (
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
    </IndexCard>
  </RecipeBox>
);

export const Alone = () => (
  <RecipeBox>
    <IndexCard>
      <DayHeading>Day 1</DayHeading>
    </IndexCard>
  </RecipeBox>
);
