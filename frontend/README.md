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
- Chatbot interface with streaming AI responses
- Community feed where users can post text/images, like and comment
- Toast notifications for actions (success/error)
- Responsive layout with a navbar and footer

## Libraries & tools used

The frontend installs and uses the following notable libraries (see `package.json` for exact versions):

- `react`, `react-dom` — UI library
- `vite` — dev server & build tool
- `@reduxjs/toolkit`, `react-redux` — state management
- `react-router` / `react-router-dom` — client-side routing and protected routes
- `axios` — HTTP client for API calls
- `react-hot-toast` — toast notifications
- `framer-motion` — UI animations
- `lucide-react` — icon library
- `@tailwindcss/vite` — styling and utility classes
- `eslint` and related plugins — linting
- Build/dev dependencies (listed in `package-lock.json`): Babel packages, TypeScript types, Vite React plugin, ESLint plugins, and other tooling automatically installed by npm.

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
    - `Chat.jsx` — chatbot page with streaming messages
    - `Community.jsx` — community feed and post creation
    - `Dashboard.jsx` — notes listing / dashboard
    - `Footer.jsx` — footer component
    - `Navbar.jsx` — navigation bar (current file)
    - `NoteCard.jsx` — individual note card component
    - `NoteModal.jsx` — modal for creating/editing notes
    - `PostItem.jsx` — single post display with comments/likes
    - `ProfileEdit.jsx` — profile editing view
    - `SideCrad.jsx` — dashboard statistics card (theme aware)
  - `utils/`
    - `ChatSlice.js` — Redux slice for chat messages and storage
    - `Constants.js` — shared constants
    - `NoteSlice.js` — Redux slice for notes
    - `NoteStore.js` — Redux store configuration (includes chat & user slices)
    - `ProtectedRoute.jsx` — route guard component
    - `ThemeContext.jsx` — theme (dark/light) context provider
    - `UserSlice.js` — Redux slice for user data

> Note: The `src/components` and `src/utils` folders contain the main UI and state logic for the app.

## API Endpoints

The frontend communicates with the backend using the base URL defined in `src/utils/Constants.js` (`http://localhost:3000` by default).
Below is a quick reference of the routes consumed by the UI. All paths are prefixed with `/api` on the server.

| Client action         | HTTP Method | Endpoint                       | Description                              |
| --------------------- | ----------- | ------------------------------ | ---------------------------------------- |
| Register user         | POST        | `/auth/signup`                 | Create a new account                     |
| Login user            | POST        | `/auth/login`                  | Authenticate and receive token           |
| Logout                | POST        | `/auth/logout`                 | Clear session on server                  |
| Get profile           | GET         | `/auth/profile`                | Retrieve authenticated user data         |
| Update profile        | PUT         | `/auth/profile-edit`           | Modify user details                      |
| Add note              | POST        | `/note/add-note`               | Create a new note                        |
| Edit note             | PUT         | `/note/edit-note/:noteId`      | Update an existing note                  |
| Delete note           | DELETE      | `/note/delete-note/:noteId`    | Remove a note                            |
| Fetch all notes       | GET         | `/note/all-note`               | Get notes for logged in user             |
| Send chat message     | POST        | `/msg/chat`                    | Talk to Grok chatbot (SSE stream)        |
| Fetch community posts | GET         | `/community/posts`             | Retrieve all posts                       |
| Create post           | POST        | `/community/post`              | Add a new community post (requires auth) |
| Like post             | PUT/PATCH   | `/community/posts/:id/like`    | Increment post like count                |
| Comment on post       | POST        | `/community/posts/:id/comment` | Add comment (requires auth)              |
| Delete post           | DELETE      | `/community/posts/:id`         | Delete own post (requires auth)          |

> **Note:** Axios calls in the code assume the frontend is running from a different origin; CORS is already configured on the backend.

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
