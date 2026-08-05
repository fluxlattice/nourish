import {
  CardStack,
  DayHeading,
  DayTabs,
  IndexCard,
  MealRow,
  PlanHeader,
  Polaroid,
  RecipeBox,
} from "@nourish/ui";

export const PlanReady = () => (
  <PlanHeader
    badge="✓ Plan ready"
    title="Your Weight Loss Plan"
    stats={["$320/month", "3 meals/day"]}
  />
);

export const TitleOnly = () => <PlanHeader title="Your Balanced Plan" />;

export const AboveTheBox = () => (
  <>
    <PlanHeader
      badge="✓ Plan ready"
      title="Your Build Muscle Plan"
      stats={["$420/month", "3 meals + snacks"]}
    />
    <RecipeBox>
      <DayTabs days={[1, 2, 3, 4, 5, 6, 7]} value={1} />
      <CardStack>
        <IndexCard>
          <DayHeading>Day 1</DayHeading>
          <MealRow
            type="Breakfast"
            photo={<Polaroid type="breakfast" fallbackIcon="☀️" />}
          >
            Greek yogurt parfait with berries and granola (380 cal)
          </MealRow>
        </IndexCard>
      </CardStack>
    </RecipeBox>
  </>
);
