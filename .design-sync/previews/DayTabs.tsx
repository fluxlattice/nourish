import { CardStack, DayTabs, DayHeading, IndexCard, RecipeBox } from "@nourish/ui";

export const FullWeek = () => (
  <RecipeBox>
    <DayTabs days={[1, 2, 3, 4, 5, 6, 7]} value={1} />
    <CardStack>
      <IndexCard>
        <DayHeading>Day 1</DayHeading>
      </IndexCard>
    </CardStack>
  </RecipeBox>
);

export const MidWeekSelected = () => (
  <RecipeBox>
    <DayTabs days={[1, 2, 3, 4, 5, 6, 7]} value={4} />
    <CardStack>
      <IndexCard>
        <DayHeading>Day 4</DayHeading>
      </IndexCard>
    </CardStack>
  </RecipeBox>
);

export const TabsAlone = () => (
  <RecipeBox>
    <DayTabs days={[1, 2, 3, 4, 5]} value={3} />
  </RecipeBox>
);
