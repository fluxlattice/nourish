# Nourish

## Environment variables

Set these in your deployment platform (e.g. Vercel project settings):

- `ANTHROPIC_API_KEY` — required. Used by `api/chat.js` to generate the meal plan, shopping list, tips, and recipes.
- `UNSPLASH_ACCESS_KEY` — optional. Used by `api/photo.js` to attach a real photo to each meal/recipe card via the [Unsplash API](https://unsplash.com/developers). Without it, `api/photo.js` returns `{ url: null }` and the app falls back to a tinted icon per meal type — no errors, no broken images.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
