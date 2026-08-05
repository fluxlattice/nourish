---
category: Layout
---

# RecipeBox

The kraft recipe box that holds the index cards — warm manila fill, darker edge, deep shadow, and a soft highlight raked across the top.

Sits inside `Page`, below `Brand`. Everything else on a screen lives in here: the box is the object, the cards are what you keep in it.

```jsx
<RecipeBox>
  <Progress count={4} current={1} label="Profile" />
  <CardStack>
    <IndexCard>{/* … */}</IndexCard>
  </CardStack>
  <Actions>
    <Button variant="ghost">← Back</Button>
    <Button>Continue →</Button>
  </Actions>
</RecipeBox>
```

Text placed directly on the box (not on a card) uses `--box-ink`, not `--ink` — the kraft is dark, the cardstock is light.
