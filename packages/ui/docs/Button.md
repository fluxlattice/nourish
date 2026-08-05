---
category: Actions
---

# Button

The action control, styled as a **rubber stamp**: solid red fill, a hard offset shadow, and a half-degree rotation so it reads as pressed onto the card by hand. Pressing it sinks the button into its own shadow.

```jsx
<Button onClick={generate} disabled={!budget}>Stamp my plan →</Button>
<Button variant="ghost" onClick={back}>← Back</Button>
```

A screen carries **at most one `primary`** — the thing the user came to do.

Disabled primaries become a **dashed outline with no fill**, not a dimmed stamp: an unavailable action reads as "not stamped yet", never as a faded live one. Bind `disabled` to the same condition that gates the step; never leave a primary live and fail on click.

Labels carry a directional glyph where the action moves through the flow (`Continue →`, `← Back`, `↓ Download`).
