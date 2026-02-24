# NoteApp — Frontend (React + Vite)

This repository contains the frontend for "NoteApp", a lightweight note-taking web application built with React and Vite. The UI provides note creation, editing, deletion, and user/profile management, using a Redux-based store and client-side routing.

## Project description

- **Purpose:** Simple, responsive note-taking app where users can manage personal notes and profiles.
- **UI:** Component-driven React app with modal-based note creation/editing, a dashboard, and protected routes for authenticated areas.
- **State management:** Redux Toolkit is used for note and user slices.

## Key features

- Create, edit, and delete notes (modal UI)
- Note list / dashboard view with individual note cards
- User authentication UI (login/register stub in `Auth.jsx`) and protected routes
- Profile edit view for user preferences
- Toast notifications for actions (success/error)
- Responsive layout with a navbar and footer

## Libraries & tools used

The frontend installs and uses the following notable libraries (see `package.json` for exact versions):

- `react`, `react-dom` — UI library
- `vite` — dev server & build tool
- `@reduxjs/toolkit`, `react-redux` — state management
- `react-router` / `react-router-dom` — client-side routing and protected routes
- `axios` — HTTP client for API calls
- `react-hot-toast`, `` — toast notifications
- `framer-motion` — UI animations
- `lucide-react` — icon library
- `@tailwindcss/vite` — styling and utility classes
- `eslint` and related plugins — linting

## Project structure (frontend folder)

- `eslint.config.js`
- `index.html`
- `package.json` — scripts & dependencies
- `README.md` (this file)
- `vite.config.js`
- `public/` — static assets
- `src/` — application source
  - `App.css`
  - `App.jsx`
  - `main.jsx`
  - `assets/`
  - `components/`
    - `Auth.jsx` — authentication UI component
    - `Body.jsx` — main body layout component
    - `Dashboard.jsx` — notes listing / dashboard
    - `Footer.jsx` — footer component
    - `Navbar.jsx` — navigation bar (current file)
    - `NoteCard.jsx` — individual note card component
    - `NoteModal.jsx` — modal for creating/editing notes
    - `ProfileEdit.jsx` — profile editing view
  - `utils/`
    - `Constants.js` — shared constants
    - `NoteSlice.js` — Redux slice for notes
    - `NoteStore.js` — Redux store configuration
    - `ProtectedRoute.jsx` — route guard component
    - `ThemeContext.jsx` — theme (dark/light) context provider
    - `UserSlice.js` — Redux slice for user data

> Note: The `src/components` and `src/utils` folders contain the main UI and state logic for the app.

## Scripts

Run these from the `frontend` folder:

- Install dependencies:

  ```bash
  npm install
  ```

- Start dev server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Lint (ESLint):

  ```bash
  npm run lint
  ```

## How it works (high level)

- The app bootstraps in `main.jsx` and mounts `App.jsx` which configures routing and global providers (Redux, Theme).
- `NoteSlice.js` and `UserSlice.js` keep app state in a central store (`NoteStore.js`).
- `ProtectedRoute.jsx` wraps routes that require authentication.
- API calls should be performed via `axios` with endpoints implemented in your backend; `Auth.jsx` and `NoteModal.jsx` are the main integration points for auth and note actions.

## Contributing

If you'd like to contribute, fork the repo, create a branch for your feature or fix, and open a pull request with a clear description of changes.

---

Updated README to describe the NoteApp frontend, its features, file layout, and dependencies.
