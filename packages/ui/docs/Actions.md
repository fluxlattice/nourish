---
category: Layout
---

# Actions

Footer row for a screen's actions.

`row` (default) is the wizard footer — a ghost Back beside a primary that takes the remaining width. The primary flexes automatically; no wrapper needed.

```jsx
<Actions>
  <Button variant="ghost" onClick={back}>← Back</Button>
  <Button onClick={next} disabled={!canContinue}>Continue →</Button>
</Actions>
```

`grid` gives both children equal halves — for two actions of comparable weight.

```jsx
<Actions layout="grid">
  <Button variant="ghost" onClick={restart}>← Start Over</Button>
  <Button onClick={download}>↓ Download</Button>
</Actions>
```
