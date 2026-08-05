---
category: Layout
---

# FieldPair

Two-column grid for paired form fields — Age beside Gender, Weight beside Height.

```jsx
<FieldPair>
  <TextField label="Age" type="number" value={age} onChange={setAge} placeholder="28" />
  <SelectField label="Gender" value={gender} onChange={setGender} options={genders} />
  <TextField label="Weight (lbs)" type="number" value={weight} onChange={setWeight} placeholder="160" />
  <TextField label="Height (in)" type="number" value={height} onChange={setHeight} placeholder="67" />
</FieldPair>
```

Keeps four related numbers on one card without scrolling. Fields that need the full width — a budget, a long select — sit outside it rather than spanning it.
