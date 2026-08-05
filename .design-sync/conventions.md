# Building with Nourish

Nourish is a **paper design system**. Every screen is a wooden tabletop holding a kraft recipe box, and the box holds cream index cards you write on. Type is handwritten throughout — Dancing Script for display, Kalam for body. Nothing here is a flat modern UI, and it is light-only.

Getting this right is mostly about respecting **two surfaces** and **one alignment rule**.

## Always wrap in `Page`

`Page` paints the tabletop and centres a 460px column. Components rendered outside it land on a white background in a system sans — they will look broken and nothing will warn you.

```jsx
<Page>
  <Brand name="Nourish" tagline="Personalized meal planning" />
  <RecipeBox>
    <Progress count={4} current={1} label="Profile" />
    <CardStack>
      <IndexCard>{/* content */}</IndexCard>
    </CardStack>
  </RecipeBox>
</Page>
```

`Page` → `Brand` → `RecipeBox` → `CardStack` → `IndexCard` is the shape of nearly every screen. `Brand` and `PlanHeader` sit on the tabletop, **outside** the box.

## The two surfaces — get the ink right

This is the single easiest thing to get wrong.

| Surface | Background | Text tokens |
|---|---|---|
| Tabletop (`Page`) | `--bg` `#3c2a1c` + `--bg-glow` | `--page-ink`, `--page-ink-faint` |
| Kraft box (`RecipeBox`) | `--box` `#c9a468`, edge `--box-dark` | `--box-ink`, `--box-ink-muted` |
| Index card (`IndexCard`) | `--card` `#fbf1de`, alt `--card-alt` | `--ink`, `--ink-muted`, `--ink-faint` |

Dark ink on the tabletop is invisible; page ink on cardstock is invisible. When you add your own element, pick the ink for the surface it lands on.

## The ruled-line rule

`IndexCard` draws blue rules every `--rule-line` (32px) with a red margin (`--rule-red`) down the left. **Body copy must use `line-height: var(--rule-line)`** so each line sits *on* a rule rather than drifting between them. `StepSub`, `MealRow`, `IngredientRow`, `StepRow` and `ShoppingRow` already do. If you write your own paragraph on a card, match it — this alignment is the whole illusion.

Left padding on the card clears the red margin; don't reduce it.

## Colour vocabulary

- `--accent` `#b5473c` **stamp red** — primary actions, active tabs, meal-type tags, shopping categories
- `--green` `#5c7a41` **herb green** — selection states and ingredients
- `--gold` `#c1892e` **mustard** — recipe steps and tips
- `--danger` — failure only
- Radii `--radius-sm|md|lg`, easing `--ease`, fonts `--font-display` / `--font-body`

**Green gathers, mustard instructs.** `RecipeSectionTitle tone="ingredients"` is green over `IngredientRow`; `tone="steps"` is mustard over `StepRow`. Never swap them.

## Selection is dashed → solid

Unselected `Chip`, `GoalCard` and `ActivityCard` all use a **dashed** border on `--card-alt`. Selecting one makes the border solid green with a green-tinted fill. That single idiom carries every choice in the system — don't invent a different selected look.

Sets: `Chip` = many, `GoalCard` = one with explanation, `ActivityCard` = one terse in an `ActivityGrid`.

## Style through props, not new CSS

Components take semantic props — `variant`, `tone`, `selected`, `layout`, `size`, `tilt`. For your own layout glue use the tokens above, never raw values.

Classes are plain and unprefixed (`.page`, `.index-card`, `.btn-primary`, `.goal-card`). **Read them; don't write them.** Composing a new class means the component you need doesn't exist — say so rather than faking it.

## Rules that carry meaning

- **One `primary` Button per screen.** Disabled primaries go to a dashed outline with no fill, never a dimmed stamp.
- **No decorative emoji.** Chips, the header badge and the welcome features were deliberately stripped of them. Glyphs survive only in `GoalCard`'s icon chip, `Segmented` labels and `Polaroid` fallbacks.
- **`Polaroid` tilts alternate** down a list (`i % 2 ? "right" : "left"`), and photo credit is a quiet line under the print — never an overlay on the image.
- `TextField` / `SelectField` `onChange` receive the **value**, not the event: `onChange={setAge}`.
- Empty is not an error — `EmptyNote`, never `ErrorNote`.

## Where the truth lives

Read the bound `styles.css` and its imports — `tokens.css` (every custom property) and `_ds_bundle.css` (every rule) — before styling. Each component ships a `.prompt.md` with usage and a `.d.ts` with exact props. Those are authoritative; this page is orientation.

## A representative screen

```jsx
<Page>
  <Brand name="Nourish" tagline="Personalized meal planning" />
  <RecipeBox>
    <Progress count={4} current={2} label="Goals & Activity" />
    <CardStack>
      <IndexCard>
        <StepTitle>Your goal &amp; activity</StepTitle>
        <StepSub>We'll tailor your entire plan around this.</StepSub>

        <GoalCard icon="🔥" label="Lose Weight" description="Calorie deficit, high protein" selected />
        <GoalCard icon="💪" label="Build Muscle" description="Calorie surplus, protein-rich" />

        <FieldLabel>Activity Level</FieldLabel>
        <ActivityGrid>
          <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
          <ActivityCard label="Very Active" description="Daily intense exercise" selected />
        </ActivityGrid>
      </IndexCard>
    </CardStack>
    <Actions>
      <Button variant="ghost">← Back</Button>
      <Button>Continue →</Button>
    </Actions>
  </RecipeBox>
</Page>
```

Library components for the parts, tokens for the gaps between them.
