---
category: Navigation
---

# DayTabs

Row of file-divider tabs for navigating a multi-day plan.

```jsx
<DayTabs days={[1, 2, 3, 4, 5, 6, 7]} value={day} onChange={setDay} />
<CardStack>
  <IndexCard>{/* the selected day */}</IndexCard>
</CardStack>
```

The active tab takes the cream card colour so it reads as the divider in front — it visually joins the card below, which is why the two sit flush with **no gap between them**. Don't add margin under this component.

Scrolls horizontally rather than wrapping, so a week of tabs keeps to one line.
