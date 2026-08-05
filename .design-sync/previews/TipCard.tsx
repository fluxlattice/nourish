import { IndexCard, RecipeBox, TipCard } from "@nourish/ui";

export const Single = () => (
  <RecipeBox>
    <IndexCard>
      <TipCard number={1}>
        Buy frozen berries instead of fresh — about a third of the price and they work
        just as well in overnight oats.
      </TipCard>
    </IndexCard>
  </RecipeBox>
);

export const TipList = () => (
  <RecipeBox>
    <IndexCard>
      <TipCard number={1}>
        Buy frozen berries instead of fresh — about a third of the price and they work
        just as well in overnight oats.
      </TipCard>
      <TipCard number={2}>
        Cook the quinoa for days 3–5 in one batch on Sunday; it keeps four days
        refrigerated.
      </TipCard>
      <TipCard number={3}>
        Swap salmon for tinned sardines once a week to stay inside your $80 weekly
        budget without losing the omega-3s.
      </TipCard>
    </IndexCard>
  </RecipeBox>
);
