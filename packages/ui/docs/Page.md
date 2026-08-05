---
category: Layout
---

# Page

Root wrapper for every Nourish screen. Paints the walnut tabletop, the warm overhead glow, and centres content in a 460px column.

**Wrap every screen in it.** The tokens, the body font and the background all come from here — a screen built without it renders as black-on-white browser defaults.

```jsx
<Page>
  <Brand name="Nourish" tagline="Personalized meal planning" />
  <RecipeBox>
    <CardStack>
      <IndexCard>{/* screen content */}</IndexCard>
    </CardStack>
  </RecipeBox>
</Page>
```

That nesting — page → brand → box → stack → card — is the shape of essentially every screen in this system.
