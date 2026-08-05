---
category: Typography
---

# FieldLabel

Small uppercase label above a control, in faint ink.

`TextField` and `SelectField` render one from their `label` prop — reach for this directly only when labelling something with no label of its own.

```jsx
<FieldLabel>Activity Level</FieldLabel>
<ActivityGrid>
  <ActivityCard label="Mostly Sitting" description="Desk job, little exercise" />
  <ActivityCard label="Very Active" description="Daily intense exercise" selected />
</ActivityGrid>
```

Labels are written in title case and uppercased by CSS — write them normally.
