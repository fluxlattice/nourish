---
category: Actions
---

# ActivityCard

Compact centred single-select tile, laid out in an `ActivityGrid`.

```jsx
<FieldLabel>Activity Level</FieldLabel>
<ActivityGrid>
  {ACTIVITIES.map((a) => (
    <ActivityCard
      key={a.id}
      label={a.label}
      description={a.desc}
      selected={activity === a.id}
      onClick={() => setActivity(a.id)}
    />
  ))}
</ActivityGrid>
```

Selection is the dashed border going solid green with a tinted fill — there is no check glyph, so that shift carries it alone.

Labels of two or three words; descriptions a short qualifier ("3–4 workouts/week").
