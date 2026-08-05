---
category: Navigation
---

# Segmented

Underlined tab strip for switching views. The active tab takes stamp red with a matching underline.

```jsx
<Segmented
  items={[
    { id: "meals", label: "🍽 Meals" },
    { id: "recipes", label: "📖 Recipes" },
  ]}
  value={tab}
  onChange={setTab}
/>
{tab === "meals" && <MealsPanel />}
```

Renders only the strip — you render the panel yourself based on `value`.

Tabs are left-aligned and sized to their text rather than sharing the width equally, so the strip reads as a set of headings rather than a row of buttons. Two to four items.
