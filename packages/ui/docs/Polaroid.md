---
category: Content
---

# Polaroid

A meal photo mounted as a polaroid print — white border, heavier bottom edge, soft shadow, tilted a few degrees.

Handles all three states itself: `loading` shows a shimmer, a missing `src` falls back to a tinted panel keyed to the meal `type`, and a real photo fills the frame.

```jsx
<Polaroid
  src={photo?.url}
  alt="Overnight oats with berries"
  loading={!loaded}
  type="breakfast"
  fallbackIcon="☀️"
  tilt={i % 2 === 0 ? "left" : "right"}
  credit={photo?.photographer}
  creditHref={photo?.photographerUrl}
/>
```

**Alternate `tilt` down a list** — a column of prints all leaning the same way looks like a mistake rather than a scrapbook.

`size="lg"` is the larger print used on `RecipeEntry`. Attribution renders as a quiet line **under** the print, never as an overlay pill on the image — that was tried and removed.
