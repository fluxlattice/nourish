---
category: Forms
---

# SelectField

Dropdown for closed sets — gender, cooking skill, meals per day. Shares `TextField`'s underline treatment and swaps the native arrow for a small hand-drawn chevron so it doesn't break the paper illusion.

```jsx
<SelectField
  label="Cooking Skill"
  value={skill}
  onChange={setSkill}
  options={[
    { value: "beginner", label: "Beginner — quick simple meals" },
    { value: "intermediate", label: "Intermediate — comfortable cooking" },
    { value: "advanced", label: "Advanced — love to cook" },
  ]}
/>
```

Like `TextField`, `onChange` receives the value directly.

Option labels can carry a short qualifier after an em dash — it's the only explanatory room a select has.
