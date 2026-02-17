# Login Endpoint Documentation

## Overview

The `/login` endpoint is used to authenticate a user and generate an authentication token for subsequent requests.

## Endpoint Details

| Property           | Value                |
| ------------------ | -------------------- |
| **Method**         | POST                 |
| **Route**          | `/login`             |
| **Authentication** | No (public endpoint) |
| **Content-Type**   | application/json     |

---

## Request

### URL

```
POST /login
```

### Request Body

```json
{
  "emailId": "user@example.com",
  "password": "userPassword123"
}
```

### Parameters

| Parameter  | Type   | Required | Description                      |
| ---------- | ------ | -------- | -------------------------------- |
| `emailId`  | String | Yes      | The email ID of the user         |
| `password` | String | Yes      | The password of the user account |

---

## Response

### Success Response (200 OK)

**Code:** `200`

**Response Body:**

```json
{
  "message": "User LogedIn Sucessfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "findUser": {
    "_id": "60d5ec49c1234567890abcdef",
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "user@example.com"
  }
}
```

---

## Error Responses

### Invalid Credentials (404 Not Found)

**Code:** `404`

**Scenario:** User account not found with the provided email ID

**Response Body:**

```json
{
  "message": "Invalid Credentials"
}
```

---

### Invalid Password (404 Not Found)

**Code:** `404`

**Scenario:** Password does not match the stored password for the user

**Response Body:**

```json
{
  "message": "invalid Credenitials"
}
```

---

### Server Error (400 Bad Request)

**Code:** `400`

**Scenario:** Any unexpected error during the login process

**Response Body:**

```json
{
  "message": "<error message>"
}
```

---

## Cookie

After successful login, the server sets an authentication token in the response cookie:

```
Set-Cookie: token=<jwt-token>
```

This token should be sent with subsequent requests for authentication.

---

## Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "user@example.com",
    "password": "userPassword123"
  }'
```

### Using JavaScript/Fetch

```javascript
const loginUser = async () => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: "user@example.com",
        password: "userPassword123",
      }),
      credentials: "include", // Include cookies
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data.token);
    } else {
      console.error("Login failed:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### Using Axios

```javascript
const axios = require("axios");

axios
  .post("/login", {
    emailId: "user@example.com",
    password: "userPassword123",
  })
  .then((response) => {
    console.log("Login successful:", response.data.token);
  })
  .catch((error) => {
    console.error("Login failed:", error.response.data.message);
  });
```

---

## Notes

- The password is compared using a `comparePassword()` method that handles hashing comparison
- The token is generated using a `getAuthToken()` method
- User passwords are selected with `+password` projection to retrieve them from the database
- The token is automatically set in a cookie for session management
- User sensitive data (like password) is not returned in the response body

---

## Related Endpoints

- [POST /signup](./SIGNUP_ENDPOINT.md) - Register a new user account
