# NoteApp — Frontend (React + Vite)

This repository contains the frontend for "NoteApp", a lightweight note-taking web application built with React and Vite. The UI provides note creation, editing, deletion, user/profile management, community sharing, and AI chatbot integration, using Redux Toolkit for state management and client-side routing.

## Project description

- **Purpose:** Full-featured note-taking app where users can manage personal notes, connect with community, and chat with AI assistant.
- **UI:** Component-driven React app with modal-based interactions, protected routes for authenticated areas, and responsive design.
- **State management:** Redux Toolkit with separate slices for notes, chat, and user data.
- **Styling:** Tailwind CSS for utility-based responsive design.
- **Build Tool:** Vite for fast development and optimized production builds.

## Key Features

### User Authentication & Profile Management

- User registration and login with email/password
- Google OAuth 2.0 authentication integration
- Secure password storage and JWT-based session management
- Forgot password and password reset via email
- User profile editing (name, email, bio/about section)
- Change password functionality
- Protected routes for authenticated-only pages

### Notes Management

- **Create Notes**: Modal-based UI for adding new notes with title, content, and tags
- **Edit Notes**: Update existing notes with real-time changes
- **Delete Notes**: Remove notes with confirmation
- **View Notes**: Dashboard displaying all user notes as individual cards
- **Search & Filter**: Notes organized with tags for easy categorization
- **Persistent Storage**: Notes synced with backend MongoDB database

### Community Features

- **Community Feed**: Browse posts from all users
- **Create Posts**: Share text and images with the community
- **Like Posts**: Upvote community posts
- **Comments**: Add comments to posts (infrastructure ready)
- **User Engagement**: See author information and timestamps
- **Delete Posts**: Remove own posts

### AI Chatbot

- **Grok AI Integration**: Real-time streaming chat with Grok AI
- **Conversation History**: Persistent chat history stored in localStorage
- **SSE Streaming**: Server-Sent Events for real-time message streaming
- **Message Storage**: Chat conversations preserved across sessions
- **User-friendly Interface**: Clean chat UI with message timestamps

### User Experience Enhancements

- **Toast Notifications**: Real-time feedback for all actions (success, error, loading)
- **Dark/Light Theme**: Toggle between dark and light modes with context provider
- **Responsive Design**: Mobile-friendly UI that works on all screen sizes
- **Protected Routes**: Unauthorized users redirected to login
- **Error Handling**: Comprehensive error pages and error boundaries
- **Smooth Animations**: Framer Motion for elegant UI transitions

## Project Structure

```
frontend/
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/                    # Static assets
├── src/
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global styles
│   ├── main.jsx              # React DOM entry point
│   ├── assets/               # Images, icons, media files
│   ├── components/           # React components
│   │   ├── Auth.jsx          # Login/Signup with Google OAuth
│   │   ├── Body.jsx          # Main layout wrapper
│   │   ├── ChangePassword.jsx # Password change form
│   │   ├── Chat.jsx          # Chatbot interface with streaming
│   │   ├── Community.jsx     # Community feed and post creation
│   │   ├── Dashboard.jsx     # Notes dashboard/listing
│   │   ├── Footer.jsx        # App footer
│   │   ├── ForgotPassword.jsx # Password recovery initiation
│   │   ├── Navbar.jsx        # Navigation bar with theme toggle
│   │   ├── NoteCard.jsx      # Individual note display card
│   │   ├── NoteModal.jsx     # Modal for creating/editing notes
│   │   ├── PostItem.jsx      # Community post display with interactions
│   │   ├── ProfileEdit.jsx   # User profile editing form
│   │   ├── ResetPassword.jsx # Password reset with token
│   │   └── SideCard.jsx      # Dashboard statistics card
│   └── utils/                # Utility functions and Redux slices
│       ├── ChatSlice.js      # Redux slice for chat messages
│       ├── Constants.js      # API base URL and constants
│       ├── Error.jsx         # 404 error page
│       ├── NoteSlice.js      # Redux slice for notes CRUD
│       ├── ProtectedRoute.jsx # Route authentication guard
│       ├── Store.js          # Redux store configuration
│       ├── ThemeContext.jsx  # Dark/Light theme provider
│       └── UserSlice.js      # Redux slice for user authentication data
```

## Component Details

### Authentication Components

**Auth.jsx**

- Handles login and signup forms
- Google OAuth integration with credential verification
- Email validation and password strength checking
- JWT token storage in cookies
- Redux dispatch for user state management

**ForgotPassword.jsx**

- Email-based password recovery
- Sends reset link to user email
- Validates email existence in system

**ResetPassword.jsx**

- Token-based password reset
- Validates reset token from email link
- Updates password securely

**ChangePassword.jsx**

- Allow authenticated users to change password
- Requires current password verification
- New password validation

### Feature Components

**Dashboard.jsx**

- Main page showing all user notes
- Dynamic card-based layout
- Edit and delete note buttons on each card
- Create new note button with modal
- Loading and error states

**NoteCard.jsx**

- Displays individual note preview
- Shows title, content snippet, tags
- Edit and delete action buttons
- Click to expand functionality

**NoteModal.jsx**

- Modal form for creating/editing notes
- Fields: title, content, tags
- Input validation before submission
- Real-time character count
- Close/Cancel functionality

**Chat.jsx**

- Chat interface with message display
- Message input form
- SSE streaming for real-time responses
- Chat history loading from localStorage
- User and bot message differentiation
- Loading indicators during API calls

**Community.jsx**

- Post creation form (title, description, image)
- Community post feed display
- Filter and sort options
- Integration with PostItem component

**PostItem.jsx**

- Individual post display
- Author information and timestamp
- Like button with count
- Comment section infrastructure
- Delete button for own posts
- Image display for posts with media

**ProfileEdit.jsx**

- User profile information form
- Fields: firstName, lastName, email, about/bio
- Update profile functionality
- Success/error notifications
- Current user data pre-population

## Redux State Management

### ChatSlice.js

- Manages chat message history
- Actions: `setMessages`, `addMessage`, `updateMessage`, `clearChat`
- LocalStorage persistence for chat history
- Message ID and timestamp tracking

### NoteSlice.js

- CRUD operations for notes
- Actions for adding, updating, deleting notes
- Manages notes array state
- Syncs with backend API

### UserSlice.js

- Stores authenticated user information
- Actions: `addUser`, `updateUser`, `removeUser`
- Persists user session
- Manages authentication state

### Store.js

- Central Redux store configuration
- Combines all slices (chat, notes, user)
- Configures store with middleware

## API Dependencies & Packages

| Package                         | Version  | Purpose                              |
| ------------------------------- | -------- | ------------------------------------ |
| **react**                       | ^19.2.0  | React library for UI components      |
| **react-dom**                   | ^19.2.0  | DOM rendering for React              |
| **react-router-dom**            | ^7.13.0  | Client-side routing and navigation   |
| **react-router**                | ^7.13.0  | Core routing utilities               |
| **@reduxjs/toolkit**            | ^2.11.2  | Redux state management with slices   |
| **react-redux**                 | ^9.2.0   | React bindings for Redux             |
| **axios**                       | ^1.13.5  | HTTP client for API requests         |
| **react-hot-toast**             | ^2.6.0   | Toast notifications library          |
| **framer-motion**               | ^12.34.2 | Animation library for UI transitions |
| **lucide-react**                | ^0.574.0 | Icon library with React components   |
| **tailwindcss**                 | ^4.2.0   | Utility-first CSS framework          |
| **@tailwindcss/vite**           | ^4.2.0   | Vite plugin for Tailwind CSS         |
| **@react-oauth/google**         | ^0.13.4  | Google OAuth 2.0 authentication      |
| **vite**                        | ^7.3.1   | Build tool and dev server            |
| **eslint**                      | ^9.39.1  | JavaScript linter                    |
| **@vitejs/plugin-react**        | ^5.1.1   | Vite plugin for React                |
| **eslint-plugin-react-hooks**   | ^7.0.1   | ESLint rules for React hooks         |
| **eslint-plugin-react-refresh** | ^0.4.24  | ESLint rules for React Fast Refresh  |

## Available Scripts

```bash
npm run dev       # Start development server with hot reload (Vite)
npm run build     # Build optimized production bundle
npm run preview   # Preview production build locally
npm run lint      # Run ESLint to check code quality
```

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file with:

   ```
   VITE_REACT_APP_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open browser to `http://localhost:5173` (or provided URL)

## Environment Configuration

Key environment variables (in `.env` or `.env.local`):

- `VITE_REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth Client ID for authentication
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:3000)

## Comprehensive API Endpoints Reference

The frontend communicates with the backend API. All requests use Axios with `withCredentials: true` for cookie-based authentication.

### Authentication Routes (`/api/auth`)

| Feature         | Method | Endpoint                | Component          | Purpose                                     |
| --------------- | ------ | ----------------------- | ------------------ | ------------------------------------------- |
| Register User   | POST   | `/auth/signup`          | Auth.jsx           | Create new user account with email/password |
| Login User      | POST   | `/auth/login`           | Auth.jsx           | Authenticate user and receive JWT token     |
| Google OAuth    | POST   | `/auth/google-login`    | Auth.jsx           | Authenticate using Google OAuth credential  |
| Get Profile     | GET    | `/auth/profile`         | ProfileEdit.jsx    | Retrieve current authenticated user data    |
| Update Profile  | PUT    | `/auth/profile-edit`    | ProfileEdit.jsx    | Update user name, email, bio                |
| Forgot Password | POST   | `/auth/forgot-password` | ForgotPassword.jsx | Send password reset email                   |
| Reset Password  | POST   | `/auth/reset-password`  | ResetPassword.jsx  | Reset password with token from email        |
| Change Password | POST   | `/auth/change-password` | ChangePassword.jsx | Change password for logged-in user          |
| Logout          | POST   | `/auth/logout`          | Navbar.jsx         | End user session                            |

### Notes Routes (`/api/note`)

| Feature        | Method | Endpoint                    | Component     | Purpose                                   |
| -------------- | ------ | --------------------------- | ------------- | ----------------------------------------- |
| Add Note       | POST   | `/note/add-note`            | NoteModal.jsx | Create new note with title, content, tags |
| Get All Notes  | GET    | `/note/all-note`            | Dashboard.jsx | Fetch all notes for logged-in user        |
| Get Note by ID | GET    | `/note/edit-note/:noteId`   | NoteCard.jsx  | Retrieve specific note details            |
| Edit Note      | PUT    | `/note/edit-note/:noteId`   | NoteModal.jsx | Update existing note content              |
| Delete Note    | DELETE | `/note/delete-note/:noteId` | NoteCard.jsx  | Remove note from database                 |

### Chat Routes (`/api/msg`)

| Feature          | Method | Endpoint       | Component | Purpose                                          |
| ---------------- | ------ | -------------- | --------- | ------------------------------------------------ |
| Send Chat        | POST   | `/msg/chat`    | Chat.jsx  | Send message to Grok AI (SSE streaming response) |
| Get Chat History | GET    | `/msg/history` | Chat.jsx  | Fetch previous chat messages                     |

### Community/Posts Routes (`/api/community`)

| Feature           | Method    | Endpoint                        | Component     | Purpose                                        |
| ----------------- | --------- | ------------------------------- | ------------- | ---------------------------------------------- |
| Get All Posts     | GET       | `/community/posts`              | Community.jsx | Fetch all community posts                      |
| Create Post       | POST      | `/community/post`               | Community.jsx | Create new post with title, description, image |
| Like Post         | PUT/PATCH | `/community/posts/:id/like`     | PostItem.jsx  | Toggle like on post                            |
| Get Post Comments | GET       | `/community/posts/:id/comments` | PostItem.jsx  | Fetch comments on post                         |
| Add Comment       | POST      | `/community/posts/:id/comment`  | PostItem.jsx  | Add comment to post                            |
| Delete Post       | DELETE    | `/community/posts/:id`          | PostItem.jsx  | Delete own post                                |

## Data Flow & State Management

### User Authentication Flow

1. User enters credentials in Auth.jsx
2. Axios POST request to `/auth/signup` or `/auth/login`
3. Backend returns JWT token and user object
4. Token stored in cookies (handled by axios withCredentials)
5. UserSlice Redux action dispatches `addUser()` to store user data
6. ProtectedRoute component checks Redux user state for access

### Notes Management Flow

1. User creates note via NoteModal.jsx
2. Redux NoteSlice state updated optimistically
3. Axios POST to `/note/add-note` with title, content, tags
4. Server responds with created note with MongoDB \_id
5. Dashboard.jsx fetches all notes on component mount
6. NoteCard components render from Redux state

### Chat Message Flow

1. User types message in Chat.jsx
2. Component sends POST request with SSE streaming
3. Server streams response as `text/event-stream`
4. Component captures streamed text chunks
5. ChatSlice Redux actions update messages array
6. Messages persist in localStorage for history

### Community Post Flow

1. User creates post in Community.jsx
2. Axios POST with title, description, image
3. Server stores in database with user reference
4. PostItem components render from fetched posts
5. Like/comment actions trigger PATCH/POST requests
6. Real-time UI updates via Redux or direct state

## Error Handling & User Feedback

- **Toast Notifications**: All API calls wrapped with success/error toast messages
- **Error.jsx**: 404 page for undefined routes
- **ProtectedRoute.jsx**: Redirects unauthenticated users to login
- **Try-Catch Blocks**: API calls wrapped in error handling
- **Loading States**: UI shows loading indicators during API requests
- **Validation**: Client-side validation before API submission

## Build & Deployment

### Production Build

```bash
npm run build
# Creates optimized bundle in `dist/` folder
# Minifies code, optimizes images, tree-shakes unused code
```

### Preview Production Build

```bash
npm run preview
# Serves the production build locally for testing
```

## Styling Architecture

- **Tailwind CSS**: Utility-based responsive design
- **Custom CSS**: App.css for global styles and layouts
- **Framer Motion**: Smooth animations and transitions
- **Theme Context**: Dark/Light mode toggle for entire app
- **Lucide Icons**: Scalable SVG icons throughout UI
- **Responsive Design**: Mobile-first approach with breakpoints

## Performance Optimizations

- **Code Splitting**: React Router enables automatic route-based code splitting
- **Tree Shaking**: Unused code removed during build
- **Image Optimization**: Vite automatically optimizes images
- **Lazy Loading**: Components loaded on-demand via routes
- **LocalStorage Caching**: Chat history persists without re-fetching
- **Redux Middleware**: Optimized state updates prevent unnecessary re-renders

## Security Considerations

- **JWT Authentication**: Secure token-based auth with cookies (HttpOnly recommended)
- **Protected Routes**: Sensitive pages require authentication
- **CORS Configuration**: Backend configured for frontend origin
- **Input Validation**: Client and server-side validation
- **Credential Sharing**: Axios configured with `withCredentials` for cookie handling
- **Environment Variables**: Sensitive config in .env files (not committed to repo)

## Browser Compatibility

Works on all modern browsers supporting:

- ES6+ JavaScript
- CSS Grid & Flexbox
- LocalStorage API
- Fetch/XMLHttpRequest APIs

Tested on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Port 5173 already in use

```bash
npx vite --port 5174
```

### API requests failing

- Check backend is running on http://localhost:3000
- Verify CORS configuration in backend
- Check network tab in browser DevTools

### Chat not streaming

- Verify Grok API key is set in backend .env
- Check server-side SSE headers are correct
- Browser must support EventSource API

### Notes not persisting

- Verify MongoDB connection string in backend
- Check user JWT token validity
- Review browser console for API errors

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file with:

   ```
   VITE_REACT_APP_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open browser to `http://localhost:5173` (or provided URL)

## Environment Configuration

Key environment variables (in `.env` or `.env.local`):

- `VITE_REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth Client ID for authentication
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:3000)

## API Endpoints Used

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
