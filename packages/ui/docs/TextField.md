---
category: Forms
---

# TextField

Text input drawn as a **ruled line, not a box** — transparent fill with a single ink underline that turns stamp red on focus.

It reads as writing on the card rather than filling in a form widget, which is the whole point. Don't give it a background or a border box.

```jsx
<TextField
  label="Monthly Food Budget ($)"
  type="number"
  value={budget}
  onChange={setBudget}
  placeholder="300"
  hint={budget ? `≈ $${Math.round(budget / 4)}/week` : undefined}
/>
```

`onChange` hands you the string value directly — `onChange={setBudget}` is the idiomatic call, there is no event to unwrap.

Placeholders show a realistic example value ("28", "160"), never a restatement of the label.
