import {
  Chip,
  ChipGroup,
  FieldLabel,
  IndexCard,
  RecipeBox,
  StepSub,
  StepTitle,
} from "@nourish/ui";

export const WithContent = () => (
  <RecipeBox>
    <IndexCard>
      <StepTitle>Diet &amp; Budget</StepTitle>
      <StepSub>
        Customize your plan to fit your lifestyle. This copy sits on the ruled lines
        rather than floating between them.
      </StepSub>
      <FieldLabel>Dietary restrictions (select all that apply)</FieldLabel>
      <ChipGroup>
        <Chip label="Vegan" selected />
        <Chip label="Gluten-Free" />
        <Chip label="Keto" />
      </ChipGroup>
    </IndexCard>
  </RecipeBox>
);

export const Ruling = () => (
  <RecipeBox>
    <IndexCard>
      <StepSub>
        The blue rules repeat every 32px and the red margin runs down the left edge.
        Body copy uses the rule spacing as its line-height, so each line lands on a
        rule instead of drifting between them.
      </StepSub>
    </IndexCard>
  </RecipeBox>
);
