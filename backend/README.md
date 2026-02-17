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
