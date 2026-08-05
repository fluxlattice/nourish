---
category: Feedback
---

# LoadingRing

Two counter-rotating rings around a still glyph: a dashed ink track, a stamp-red ring outside and a mustard one inside.

```jsx
<LoadingRing />
<LoadingRing glyph="🥕" />
```

The standalone busy indicator, for short or inline waits. For a full waiting screen with a title and rotating copy use `LoadingView`, which composes this.

A bare ring is the wrong choice for anything longer than a couple of seconds — it says "working" but never "still working on the right thing".
