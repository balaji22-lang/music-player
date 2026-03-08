# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Run Locally

Prerequisites: Node.js (v18+ recommended) and npm installed.

- Install dependencies:

```
npm install
```

- Run the dev server (Vite serves HTTPS by default in this project):

```
npm run dev
```

- Open the app in your browser at: `https://localhost:5173`

Notes:
- OAuth settings: `src/services/auth.js` currently has a hard-coded `clientId` and `redirectUri`. Update those to your OAuth client if needed.
- You may see a browser warning about a self-signed certificate when using HTTPS locally; accept the warning or add the dev certificate to your trusted store.

Build for production:

```
npm run build
npm run preview
```
