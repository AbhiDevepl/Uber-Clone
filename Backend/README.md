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