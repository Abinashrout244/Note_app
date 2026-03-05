# NoteApp Backend API Documentation

## Project Overview

This is the backend API for the NoteApp, a full-stack application for note-taking and community sharing. The backend is built with Node.js and provides RESTful APIs for user authentication, note management, community posts, and chatbot functionality.

### Main Components

- **Authentication**: User registration, login, password reset
- **Notes Management**: Create, read, update, delete personal notes
- **Community Features**: Share posts and interact with other users
- **Chatbot**: AI-powered chat functionality
- **Database**: MongoDB for data persistence
- **Security**: JWT-based authentication and data validation

### Technology Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for password hashing
- multer for handling multipart/form-data (file uploads)

## Installation

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling for Node.js
- **jsonwebtoken**: For JWT token generation and verification
- **bcryptjs**: For password hashing
- **multer**: Middleware for handling file uploads
- **cors**: For enabling Cross-Origin Resource Sharing
- **cookie-parser**: For parsing cookies
- **dotenv**: For loading environment variables
- **nodemailer**: For sending emails
- **axios**: HTTP client for making requests
- **validator**: For data validation
- **@google/genai**: Google Generative AI SDK
- **openai**: OpenAI API client
- **@openrouter/sdk**: SDK for OpenRouter API
- **google-auth-library**: For Google OAuth authentication

## Project Structure & Implementation Details

### Folder Architecture

```
backend/
├── src/
│   ├── app.js                 # Express app setup and route configuration
│   ├── config/
│   │   └── database.js        # MongoDB connection setup
│   ├── controllers/           # Business logic for API endpoints
│   │   ├── user.controller.js
│   │   ├── note.controller.js
│   │   ├── chatbot.controller.js
│   │   └── post.controller.js
│   ├── models/                # MongoDB schemas and data models
│   │   ├── user.model.js
│   │   ├── notes.model.js
│   │   └── post.model.js
│   ├── Routes/                # API route definitions
│   │   ├── auth.route.js
│   │   ├── note.route.js
│   │   ├── chat.route.js
│   │   └── post.route.js
│   ├── middlewares/           # Custom middleware functions
│   │   └── auth.middleware.js
│   └── utils/                 # Utility functions
│       └── validateData.js
├── package.json
└── README.md
```

### Key Implementation Details

#### 1. **app.js** - Main Application Entry Point

- Sets up Express server with CORS configuration
- Connects to MongoDB database
- Configures middleware: express.json(), cookie-parser, CORS
- Registers API routes for authentication, notes, chat, and community posts
- Server runs on PORT from environment variables or defaults to 3000

#### 2. **Controllers** - Business Logic

**user.controller.js**

- `registerUser`: Register new users with email validation, password hashing, JWT token generation
- `loginUser`: Authenticate users with credentials verification
- Password reset functionality with email verification
- Google OAuth authentication integration
- User profile update and management

**note.controller.js**

- `addNotes`: Create new notes with title, content, and tags
- `editNote`: Update existing notes by ID validation
- `deleteNote`: Remove notes from user's collection
- `getAllNotes`: Fetch all notes for logged-in user
- `getNoteById`: Retrieve specific note details

**chatbot.controller.js**

- `chatWithGrok`: Streaming chat responses using Grok API (OpenAI compatible)
- Supports conversation history and context
- Server-Sent Events (SSE) for real-time text streaming

**post.controller.js**

- `allPosts`: Retrieve all community posts sorted by creation date
- `createPost`: Create new posts with title, description, and image
- `likePost`: Toggle like functionality for posts
- `deletePost`: Remove posts created by user
- Community engagement features

#### 3. **Middlewares** - Custom Middleware Functions

**auth.middleware.js**

- Verifies JWT tokens from cookies to authenticate users
- Checks if the user exists in the database
- Attaches the authenticated user to the request object for further use

**post.middleware.js**

- Configures multer for file uploads with memory storage
- Sets a file size limit of 5MB for uploaded files

#### 4. **Models** - Database Schemas

**user.model.js**

- User schema with fields: firstName, lastName, emailId, password, about
- Validations: Email format validation, password strength requirements
- Methods: `getHashPassword()` for password hashing, `getAuthToken()` for JWT generation
- Timestamps for account creation and updates

**notes.model.js**

- Notes schema with fields: userId (reference), title, content, tags
- Validations: Title minimum 3 characters, both title and content required
- Relationships: References User model for ownership tracking
- Automatic timestamps for created and updated entries

**post.model.js**

- Posts schema with fields: userId, title, description, image, likes
- Author and timestamps maintained automatically
- Support for community interactions

#### 4. **Middlewares** - Authentication & Authorization

**auth.middleware.js**

- JWT token verification from cookies
- User authentication check before protected routes
- Extracts user information for use in controllers
- Handles token expiration and invalid tokens

#### 5. **Utilities** - Helper Functions

**validateData.js**

- Email format validation
- Password strength validation (uppercase, lowercase, numbers, special characters)
- Input sanitization and verification

### Dependencies & Packages

| Package             | Version   | Purpose                                                |
| ------------------- | --------- | ------------------------------------------------------ |
| express             | ^5.2.1    | Web framework for API endpoints                        |
| mongoose            | ^9.2.1    | MongoDB object modeling and database connection        |
| jsonwebtoken        | ^9.0.3    | JWT token generation and verification                  |
| bcryptjs            | ^3.0.3    | Password hashing and security                          |
| cookie-parser       | ^1.4.7    | Parse cookie headers and populate req.cookies          |
| cors                | ^2.8.6    | Cross-Origin Resource Sharing for frontend interaction |
| dotenv              | ^17.3.1   | Environment variable management                        |
| nodemailer          | ^8.0.1    | Email sending for password reset and notifications     |
| validator           | ^13.15.26 | String validation and sanitization                     |
| axios               | ^1.13.6   | HTTP client for API requests                           |
| openai              | ^6.25.0   | OpenAI API integration for ChatGPT functionality       |
| @google/genai       | ^1.43.0   | Google Generative AI API integration                   |
| @openrouter/sdk     | ^0.9.11   | OpenRouter API for AI model access                     |
| google-auth-library | ^10.6.1   | Google OAuth 2.0 authentication                        |
| crypto              | ^1.0.1    | Cryptographic functions for secure operations          |

### Environment Variables Required

Create a `.env` file in the backend folder with the following:

```
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
FRONTEND_URL=http://localhost:5173
GROK_API_KEY=<your-grok-api-key>
OPENAI_API_KEY=<your-openai-api-key>
GMAIL_USER=<your-gmail>
GMAIL_PASSWORD=<your-gmail-app-password>
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
```

### Available Scripts

```bash
npm start      # Run production server
npm run dev    # Run development server with nodemon (auto-reload)
npm test       # Run tests (not configured)
```

## Authentication Endpoints

### POST /signup

Register a new user account.

#### Description

Creates a new user account with the provided information. The endpoint validates the input data, checks if the user already exists, and returns an authentication token upon successful registration.

#### Request Method

`POST`

#### Required Data

Send a JSON object in the request body with the following fields:

| Field       | Type   | Required | Description                                                                                       |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------- |
| `firstName` | String | Yes      | User's first name(minimum 3 characters)                                                           |
| `lastName`  | String | No       | User's last name (minimum characters)                                                             |
| `emailId`   | String | Yes      | User's email address (must be a valid email format)                                               |
| `password`  | String | Yes      | User's password (must be strong - contains uppercase, lowercase, numbers, and special characters) |

#### Example Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

#### Response Status Codes

| Status Code | Message                      | Description                                                                 |
| ----------- | ---------------------------- | --------------------------------------------------------------------------- |
| **201**     | "User Register Successfully" | User successfully registered. Returns user object and authentication token. |
| **400**     | "Field Must Be Required"     | Missing required fields (firstName, emailId, or password).                  |
| **400**     | "Give a valid Name"          | firstName or lastName is missing or invalid.                                |
| **400**     | "Email id is not Valid!"     | Provided emailId is not a valid email format.                               |
| **400**     | "Give a Strong Password"     | Password does not meet strength requirements.                               |
| **409**     | "User Already Exists!!"      | An account with the provided email already exists.                          |

#### Success Response (201)

```json
{
  "message": "User Register Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "john.doe@example.com"
  }
}
```

#### Error Response Examples

**400 - Missing Required Field:**

```json
{
  "message": "Field Must Be Required"
}
```

**400 - Invalid Email:**

```json
{
  "message": "Email id is not Valid!"
}
```

**400 - Weak Password:**

```json
{
  "message": "Give a Strong Password"
}
```

**409 - User Already Exists:**

```json
{
  "message": "User Already Exists!!"
}
```

#### Notes

- All fields are case-sensitive
- Email addresses must be unique in the database
- Passwords are hashed before storage using secure hashing algorithms
- An authentication token is returned upon successful registration for immediate login

---

### POST /login

Authenticate a user and receive an authentication token.

#### Description

Authenticates a user by verifying their email and password credentials. Upon successful authentication, the endpoint returns an authentication token that can be used for subsequent API requests.

#### Request Method

`POST`

#### Required Data

Send a JSON object in the request body with the following fields:

| Field    | Type   | Required | Description                     |
| -------- | ------ | -------- | ------------------------------- |
| emailId  | String | Yes      | User's registered email address |
| password | String | Yes      | User's account password         |

#### Example Request

```json
{
  "emailId": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

#### Response Status Codes

| Status Code | Message                    | Description                                                                    |
| ----------- | -------------------------- | ------------------------------------------------------------------------------ |
| **200**     | "User LogedIn Sucessfully" | User successfully authenticated. Returns user object and authentication token. |
| **404**     | "Invalid Credentials"      | User account not found with the provided email address.                        |
| **404**     | "invalid Credenitials"     | Password does not match the stored password for the user account.              |
| **500**     | Error message              | Unexpected server error during authentication process.                         |

#### Error Response Examples

**404 - User Not Found:**

```json
{
  "message": "Invalid Credentials"
}
```

**404 - Incorrect Password:**

```json
{
  "message": "invalid Credenitials"
}
```

**500 - Server Error:**

```json
{
  "message": "<error description>"
}
```

#### Notes

- Both emailId and password are required for login
- Password comparison is done using secure hashing algorithms
- Authentication token is set in response cookies for session management
- User passwords are not returned in the response for security reasons
- If login fails due to invalid credentials, a generic error message is returned to prevent user enumeration
- The token should be included in subsequent authenticated requests (typically in headers or cookies)

---

### POST /logout

Log out an authenticated user and clear their authentication token.

#### Description

Invalidates the user's session on the server side (or clears the auth cookie) and returns a success message. This endpoint requires authentication middleware to ensure the request is from a logged-in user.

#### Request Method

`POST`

#### Authentication

Requires valid authentication (token cookie or header) — provided by AuthMiddleware in the route.

#### Request Body

No request body required.

#### Response Status Codes

| Status Code | Message                        | Description                                              |
| ----------- | ------------------------------ | -------------------------------------------------------- |
| **200**     | "User logged out successfully" | User successfully logged out; auth cookie/token cleared. |
| **401**     | "Unauthorized"                 | Missing or invalid authentication token.                 |
| **400**     | Error message                  | Unexpected server error during logout.                   |

#### Success Response (200)

```json
{
  "message": "User logged out successfully"
}
```

#### Error Response Examples

**401 - Unauthorized:**

```json
{
  "message": "Unauthorized"
}
```

**400 - Server Error:**

```json
{
  "message": "<error description>"
}
```

#### Notes

- The server should clear the authentication cookie (e.g. Set-Cookie: token=; Max-Age=0) or otherwise instruct the client to remove stored tokens.
- The endpoint should not return any sensitive user data.

---

### GET /profile

Retrieve the authenticated user's profile information.

#### Description

Fetches the profile details of the currently authenticated user. This endpoint requires a valid authentication token and returns the user's information excluding sensitive data like passwords.

#### Request Method

`GET`

#### Authentication

Requires valid authentication (token cookie or header) — provided by AuthMiddleware in the route.

#### Request Body

No request body required.

#### Response Status Codes

| Status Code | Message          | Description                                       |
| ----------- | ---------------- | ------------------------------------------------- |
| **200**     | Success          | User profile retrieved successfully.              |
| **404**     | "User Not Found" | The authenticated user could not be found.        |
| **500**     | Error message    | Unexpected server error during profile retrieval. |

#### Success Response (200)

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "john.doe@example.com"
  }
}
```

#### Error Response Examples

**404 - User Not Found:**

```json
{
  "message": "User Not Found"
}
```

**500 - Server Error:**

```json
{
  "success": false,
  "message": "<error description>"
}
```

#### Notes

- This endpoint requires authentication; unauthenticated requests will be rejected.
- The response includes user details but excludes sensitive information like passwords.
- The user object returned matches the structure from registration/login responses.

### PUT /profile-edit

Update the authenticated user's profile information.

#### Description

Updates the currently authenticated user's profile fields (for example `firstName`, `lastName`, `about`, `photoURL`). Validates input and returns the updated user document.

#### Request Method

`PUT`

#### Authentication

Requires valid authentication (token cookie or header) — provided by `authMiddleware` in the route.

#### Request Body

Send a JSON object with any of the user fields to update. Example:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "about": "Full-stack developer",
  "photoURL": "https://example.com/avatar.jpg"
}
```

#### Response Status Codes

| Status Code | Message             | Description                                |
| ----------- | ------------------- | ------------------------------------------ |
| **200**     | Update Successfully | User updated and returns the updated user. |
| **404**     | "User not found"    | Authenticated user could not be found.     |
| **500**     | Error message       | Unexpected server error during update.     |

#### Success Response (200)

```json
{
  "message": "Update Successfully",
  "updateData": {
    "_id": "user_id",
    "firstName": "Jane",
    "lastName": "Doe",
    "emailId": "jane.doe@example.com",
    "about": "Full-stack developer"
  }
}
```

#### Notes

- Only authenticated users can update their profile.
- Submitted fields are validated according to the user schema.
- Sensitive operations (like changing password) should be handled carefully on the client and server side.

---

## Note Endpoints

### POST /add-note

Create a new note for the authenticated user.

#### Description

Creates a new note with the provided title, content, and optional tags. The note is associated with the authenticated user and stored in the database.

#### Request Method

`POST`

#### Authentication

Requires valid authentication (token cookie or header) — provided by AuthMiddleware in the route.

#### Required Data

Send a JSON object in the request body with the following fields:

| Field     | Type          | Required | Description                                       |
| --------- | ------------- | -------- | ------------------------------------------------- |
| `title`   | String        | Yes      | Note title (minimum 3 characters)                 |
| `content` | String        | Yes      | Note content                                      |
| `tags`    | Array[String] | No       | Optional array of tags for the note (default: []) |

#### Example Request

```json
{
  "title": "My First Note",
  "content": "This is the content of my note.",
  "tags": ["important", "work"]
}
```

#### Response Status Codes

| Status Code | Message                    | Description                                 |
| ----------- | -------------------------- | ------------------------------------------- |
| **200**     | "Adding Note Successfully" | Note created successfully.                  |
| **400**     | "Feild Cant't be Empty"    | Missing required fields (title or content). |
| **401**     | "Unauthorized"             | Missing or invalid authentication token.    |
| **500**     | Error message              | Unexpected server error.                    |

#### Success Response (200)

```json
{
  "sucess": true,
  "message": "Adding Note Successfully",
  "data": {
    "_id": "note_id",
    "title": "My First Note",
    "content": "This is the content of my note.",
    "tags": ["important", "work"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Error Response Examples

**400 - Missing Required Field:**

```json
{
  "message": "Feild Cant't be Empty"
}
```

**401 - Unauthorized:**

```json
{
  "message": "Unauthorized"
}
```

**500 - Server Error:**

```json
{
  "sucess": false,
  "message": "<error description>"
}
```

#### Notes

- Both title and content are required fields
- Tags are optional and default to an empty array
- The note includes automatic timestamps (createdAt, updatedAt)
- Authentication is required to create notes

---

### PUT /edit-note/:noteId

Update an existing note for the authenticated user.

#### Description

Updates an existing note identified by the noteId parameter. Only the authenticated user can edit their own notes. All fields are optional in the update request.

#### Request Method

`PUT`

#### Authentication

Requires valid authentication (token cookie or header) — provided by AuthMiddleware in the route.

#### URL Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `noteId`  | String | Yes      | The ID of the note to update |

#### Request Data

Send a JSON object in the request body with any of the following fields (all optional):

| Field     | Type          | Required | Description                                           |
| --------- | ------------- | -------- | ----------------------------------------------------- |
| `title`   | String        | No       | Updated note title (minimum 3 characters if provided) |
| `content` | String        | No       | Updated note content                                  |
| `tags`    | Array[String] | No       | Updated array of tags for the note                    |

#### Example Request

```json
{
  "title": "Updated Note Title",
  "content": "This is the updated content of my note.",
  "tags": ["updated", "important"]
}
```

#### Response Status Codes

| Status Code | Message          | Description                              |
| ----------- | ---------------- | ---------------------------------------- |
| **200**     | Success          | Note updated successfully.               |
| **404**     | "Note not exist" | The specified note ID does not exist.    |
| **401**     | "Unauthorized"   | Missing or invalid authentication token. |
| **500**     | Error message    | Unexpected server error.                 |

#### Success Response (200)

```json
{
  "updateNote": {
    "_id": "note_id",
    "title": "Updated Note Title",
    "content": "This is the updated content of my note.",
    "tags": ["updated", "important"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Error Response Examples

**404 - Note Not Found:**

```json
{
  "message": "Note not exist"
}
```

**401 - Unauthorized:**

```json
{
  "message": "Unauthorized"
}
```

**500 - Server Error:**

```json
{
  "sucess": false,
  "message": "<error description>"
}
```

#### Notes

- The noteId must be a valid MongoDB ObjectId
- All fields in the request body are optional - only provided fields will be updated
- The updatedAt timestamp is automatically updated
- Authentication is required to edit notes
- Users can only edit their own notes

### DELETE /delete-note/:noteId

Delete an existing note for the authenticated user.

#### Description

Deletes an existing note identified by the noteId parameter. Only the authenticated user can delete their own notes.

#### Request Method

`DELETE`

#### Authentication

Requires valid authentication (token cookie or header) — provided by authMiddleware in the route.

#### URL Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `noteId`  | String | Yes      | The ID of the note to update |

#### Request Data

No request body required:

#### Example Request

```json
{
  "title": "Updated Note Title",
  "content": "This is the updated content of my note.",
  "tags": ["updated", "important"]
}
```

#### Response Status Codes

| Status Code | Message            | Description                              |
| ----------- | ------------------ | ---------------------------------------- |
| **201**     | Delete sucessfully | Note deletedsuccessfully.                |
| **400**     | "invalid NoteId"   | The noteId is not a valid ObjectId       |
| **401**     | "Unauthorized"     | Missing or invalid authentication token. |
| **500**     | Error message      | Unexpected server error.                 |

#### Success Response (200)

```json
{
  "message": "Delete sucessfully",
  "data": {
    "_id": "note_id",
    "title": "Deleted Note Title",
    "content": "Deleted note content.",
    "tags": ["tag1"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Error Response Examples

**404 - Invalid NoteId:**

```json
{
  "message": "invalid NoteId"
}
```

**401 - Unauthorized:**

```json
{
  "message": "Unauthorized"
}
```

**500 - Server Error:**

```json
{
  "sucess": false,
  "message": "<error description>"
}
```

#### Notes

- The noteId must be a valid MongoDB ObjectId
- Authentication is required to delete notes
- Users can only delete their own notes

### GET /all-note

Retrieve all notes for the authenticated user.

#### Description

Fetches all notes associated with the currently authenticated user. Notes are filtered by the authenticated user's `userId`.

#### Request Method

`GET`

#### Authentication

Requires valid authentication (token cookie or header) — provided by `authMiddleware` in the route.

#### Request Data

No request body required.

#### Response Status Codes

| Status Code | Message        | Description                              |
| ----------- | -------------- | ---------------------------------------- |
| **200**     | Success        | Notes retrieved successfully.            |
| **401**     | "Unauthorized" | Missing or invalid authentication token. |
| **500**     | Error message  | Unexpected server error.                 |

#### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "_id": "note_id1",
      "title": "Note 1",
      "content": "Content of note 1.",
      "tags": ["tag1"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Error Response Examples

**401 - Unauthorized:**

```json
{
  "message": "Unauthorized"
}
```

**500 - Server Error:**

```json
{
  "success": false,
  "message": "<error description>"
}
```

#### Notes

- Returns an array of notes for the authenticated user.
- Authentication is required to retrieve notes.

---

## Post Endpoints

### GET /posts

Retrieve all community posts.

#### Description

Fetches all posts stored in the database sorted by newest first. No authentication is required for this public endpoint.

#### Request Method

`GET`

#### Response Status Codes

| Status Code | Message       | Description                   |
| ----------- | ------------- | ----------------------------- |
| **200**     | Success       | Posts retrieved successfully. |
| **500**     | Error message | Unexpected server error.      |

#### Success Response (200)

```json
[
  {
    "_id": "post_id",
    "userId": "user_id",
    "author": "John Doe",
    "avatar": "https://...",
    "title": "Sample Post",
    "description": "Post description.",
    "image": "https://...",
    "likes": 0,
    "comments": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### POST /post

Create a new community post (requires authentication).

#### Description

Allows a logged‑in user to create a post with optional image. Validates that at least one of title, description or image is present.

#### Request Method

`POST`

#### Authentication

Requires valid authentication (`authMiddleware`).

#### Required Data

Send a JSON object in the request body with any of the following fields:

| Field         | Type   | Required | Description                          |
| ------------- | ------ | -------- | ------------------------------------ |
| `title`       | String | No       | Post title                           |
| `description` | String | No       | Post description                     |
| `image`       | String | No       | URL of an image associated with post |

> At least one of title/description/image must be provided.

#### Response Status Codes

| Status Code | Message                    | Description                        |
| ----------- | -------------------------- | ---------------------------------- |
| **201**     | (post object)              | Post created successfully.         |
| **400**     | "Post content is required" | No content supplied.               |
| **401**     | "Login required"           | Authentication missing or invalid. |
| **500**     | Error message              | Unexpected server error.           |

---

### PUT /posts/:id/like (also PATCH)

Increment the like counter of a post.

#### Description

Increases the `likes` field on the specified post by one. This endpoint is idempotent on the same request and does not require authentication.

#### Request Method

`PUT` or `PATCH`

#### URL Parameters

| Parameter | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `id`      | String | Yes      | The ID of the post to like |

#### Response Status Codes

| Status Code | Message          | Description                          |
| ----------- | ---------------- | ------------------------------------ |
| **200**     | (updated post)   | Post returned with incremented likes |
| **404**     | "Post not found" | No post with given ID exists         |
| **500**     | Error message    | Unexpected server error.             |

---

### POST /posts/:id/comment

Add a comment to a post (requires authentication).

#### Description

Appends a comment object to the `comments` array of the specified post. The commenter must be authenticated.

#### Request Method

`POST`

#### Authentication

Requires valid authentication (`authMiddleware`).

#### URL Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `id`      | String | Yes      | The ID of the post to comment on |

#### Required Data

Send a JSON object in the request body:

| Field  | Type   | Required | Description              |
| ------ | ------ | -------- | ------------------------ |
| `text` | String | Yes      | The comment text content |

#### Response Status Codes

| Status Code | Message                    | Description                        |
| ----------- | -------------------------- | ---------------------------------- |
| **200**     | (post object with comment) | Comment added successfully         |
| **400**     | "Comment text is required" | Missing comment text               |
| **401**     | "Login required"           | Authentication missing or invalid. |
| **404**     | "Post not found"           | No post with given ID exists       |
| **500**     | Error message              | Unexpected server error.           |

---

### DELETE /posts/:id

Delete a post created by the authenticated user.

#### Description

Removes the specified post if the requester is the post owner. Authentication is required.

#### Request Method

`DELETE`

#### Authentication

Requires valid authentication (`authMiddleware`).

#### URL Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `id`      | String | Yes      | The ID of the post to delete |

#### Response Status Codes

| Status Code | Message                     | Description                        |
| ----------- | --------------------------- | ---------------------------------- |
| **200**     | "Post deleted successfully" | Deletion succeeded                 |
| **401**     | "Login required"            | Authentication missing or invalid. |
| **403**     | "Unauthorized"              | User is not the owner of the post  |
| **404**     | "Post not found"            | No post with given ID exists       |
| **500**     | Error message               | Unexpected server error.           |

---

## Chat Endpoint

### POST /chat

Send a message to the Grok chatbot and receive a streamed response.

#### Description

Accepts a user message (and optional conversation ID) then streams tokens back over a Server‑Sent Events connection. The client should listen for `token`, `error`, and `done` events to reconstruct the bot reply.

#### Request Method

`POST`

#### Authentication

No authentication is required for the chat endpoint.

#### Request Body

```json
{
  "message": "Hello, how are you?",
  "conversationId": "optional_conversation_id"
}
```

#### Response

The server sets `Content-Type: text/event-stream` and pushes JSON lines of the form:

```json
{ "type": "token", "token": "<text chunk>" }
```

and finally `{ "type": "done" }` when complete. Errors are sent as `{ "type": "error", "error": "<message>" }`.

#### Error Handling

If the `message` field is missing a 400 error is returned. Server or API errors stream an error event and end the stream.

---
