# User Authentication API Documentation

## Register Endpoint

### `POST /users/register`

Registers a new user in the system and returns an authentication token.

### Request Body
```json
{
  "fullname": {
    "firstname": "string (min 2 chars, required)",
    "lastname": "string (min 2 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Response Codes
- `201`: User created successfully
- `400`: Validation errors
- `500`: Server error

### Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d3b41d8e28c13d3c11f111",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response
```json
{
  "errors": [
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

## Login Endpoint

### `POST /users/login`

Authenticates a user and returns an authentication token.

### Request Body
```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Response Codes
- `200`: Login successful
- `400`: Validation errors
- `401`: Invalid credentials
- `500`: Server error

### Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d3b41d8e28c13d3c11f111",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response
```json
{
  "message": "Invalid Email or Password"
}
```

## Validation Rules

### Register
- Email must be valid
- First name must be at least 2 characters
- Password must be at least 6 characters

### Login
- Email must be valid
- Password must be at least 6 characters

## Token Blacklisting System

### Overview
The application implements a token blacklisting mechanism to handle user logout and invalidate tokens. When a user logs out, their token is added to a blacklist to prevent its further use.

### How it Works

1. **Token Storage**
- Blacklisted tokens are stored in MongoDB
- Each token entry includes:
  ```json
  {
    "token": "string (the JWT token)",
    "expiresAt": "Date (automatically set)"
  }
  ```
- Tokens automatically expire after 24 hours (86400 seconds)

### Logout Endpoint

### `GET /users/logout`

Logs out a user by blacklisting their current token.

### Headers Required
```
Authorization: Bearer <token>
```
or
```
Cookie: token=<token>
```

### Response Codes
- `200`: Logout successful
- `401`: Unauthorized/Invalid token

### Success Response
```json
{
  "message": "Logged out successfully"
}
```

### Error Response
```json
{
  "message": "Unauthorized"
}
```

### Security Features
- Tokens are automatically removed from blacklist after 24 hours
- Same token cannot be reused after logout
- All protected routes check against blacklist before allowing access
- Supports both cookie-based and Bearer token authentication