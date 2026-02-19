# NoteApp Backend API Documentation

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

### DELETE /all-note

Retrieve all notes for the authenticated user

#### Description

Fetches all notes associated with the currently authenticated user.

#### Request Method

`GET`

#### Authentication

Requires valid authentication (token cookie or header) — provided by authMiddleware in the route.

#### Request Data

No request body required:

#### Response Status Codes

| Status Code | Message        | Description                              |
| ----------- | -------------- | ---------------------------------------- |
| **200**     | Sucess         | Notes retrieved successfully.            |
| **401**     | "Unauthorized" | Missing or invalid authentication token. |
| **500**     | Error message  | Unexpected server error.                 |

#### Success Response (200)

```json
{
  "sucess": true,
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
  "sucess": false,
  "message": "<error description>"
}
```

#### Notes

- Returns an array of notes for the authenticated user
- Authentication is required to retrieve notes
