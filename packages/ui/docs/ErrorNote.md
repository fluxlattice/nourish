---
category: Feedback
---

# ErrorNote

Failure notice in muted brick red with a dashed border, above the content that failed.

```jsx
{error && <ErrorNote>{String(error.message)}</ErrorNote>}
```

The dashed border keeps it in the paper vocabulary rather than shouting like a system alert — this design never uses a saturated error colour.

A section with nothing in it is not an error; use `EmptyNote`.
