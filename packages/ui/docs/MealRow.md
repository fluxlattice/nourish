---
category: Content
---

# MealRow

One meal in a day's plan: a polaroid on the left, the meal slot in script red, and the description set on the card's ruled lines.

```jsx
<MealRow
  type="Breakfast"
  photo={<Polaroid src={url} type="breakfast" fallbackIcon="☀️" tilt="left" />}
>
  Greek yogurt parfait with berries and granola (380 cal)
</MealRow>
```

Rows are separated by a dashed rule, like entries written down a page — they are not boxed cards.

The body is one line describing the dish with its calorie count in parentheses. Full method belongs in `RecipeEntry`.
