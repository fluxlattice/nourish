import { Button, ErrorNote, IndexCard, RecipeBox, StepTitle } from "@nourish/ui";

export const ApiFailure = () => (
  <RecipeBox>
    <ErrorNote>HTTP 429: rate limit exceeded, retry after 30s</ErrorNote>
  </RecipeBox>
);

export const LongMessage = () => (
  <RecipeBox>
    <ErrorNote>
      TypeError: Failed to fetch /api/chat — the response body was closed before the
      stream completed
    </ErrorNote>
  </RecipeBox>
);

export const AboveTheCard = () => (
  <RecipeBox>
    <ErrorNote>HTTP 500: plan generation failed</ErrorNote>
    <IndexCard>
      <StepTitle>Diet &amp; Budget</StepTitle>
      <Button>Stamp my plan →</Button>
    </IndexCard>
  </RecipeBox>
);
