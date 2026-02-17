# Logout Endpoint Documentation

## Overview

The `/logout` endpoint logs out an authenticated user by clearing their authentication cookie or token.

## Endpoint Details

| Property           | Value                 |
| ------------------ | --------------------- |
| **Method**         | POST                  |
| **Route**          | `/logout`             |
| **Authentication** | Required (middleware) |
| **Content-Type**   | application/json      |

---

## Request

### URL

```
POST /logout
```

### Request Headers

- `Cookie: token=<jwt-token>` or authentication header depending on the client

### Request Body

No request body required.

---

## Response

### Success Response (200 OK)

**Code:** `200`

**Response Body:**

```json
{
  "message": "User logged out successfully"
}
```

### Unauthorized (401)

**Code:** `401`

**Scenario:** Missing or invalid authentication token

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

### Server Error (400)

**Code:** `400`

**Scenario:** Any unexpected error during logout

**Response Body:**

```json
{
  "message": "<error message>"
}
```

---

## Notes

- The route uses an authentication middleware to validate the user session before logging out.
- On success the server should clear the authentication cookie (`Set-Cookie: token=; Max-Age=0`) or otherwise invalidate the token on the client.
- No sensitive data is returned in responses.

---

## Example (cURL)

```bash
curl -X POST http://localhost:3000/logout \
  -H "Cookie: token=<jwt-token>"
```
