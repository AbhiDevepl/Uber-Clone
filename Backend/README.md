# Captain API Documentation

## Register Captain Endpoint

### `POST /api/captains/register`

Registers a new captain in the system with vehicle details.

### Request Body
```json
{
  "fullname": {
    "firstname": "string (min 2 chars, required)",
    "lastname": "string (min 2 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "vehicleType": "string (car|bike|auto, required)",
    "capacity": "number (min 1, required)",
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required, unique)"
  }
}
```

### Example Request
```bash
curl -X POST http://localhost:3000/api/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "secure123",
    "vehicle": {
      "vehicleType": "car",
      "capacity": 4,
      "color": "black",
      "plate": "ABC123"
    }
  }'
```

### Success Response (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d3b41d8e28c13d3c11f111",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "status": "inactive",
    "vehicle": {
      "vehicleType": "car",
      "capacity": 4,
      "color": "black",
      "plate": "ABC123"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

## Captain Status Update

### `PUT /api/captains/status`

Updates the captain's active/inactive status.

### Headers Required
```
Authorization: Bearer <token>
```

### Request Body
```json
{
  "status": "string (active|inactive)"
}
```

### Example Request
```bash
curl -X PUT http://localhost:3000/api/captains/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active"
  }'
```

### Success Response (200 OK)
```json
{
  "captain": {
    "_id": "60d3b41d8e28c13d3c11f111",
    "status": "active",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    }
  }
}
```

## Location Update

### `PUT /api/captains/location`

Updates the captain's current location.

### Headers Required
```
Authorization: Bearer <token>
```

### Request Body
```json
{
  "lat": "number",
  "lng": "number"
}
```

### Example Request
```bash
curl -X PUT http://localhost:3000/api/captains/location \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 51.5074,
    "lng": -0.1278
  }'
```

### Success Response (200 OK)
```json
{
  "captain": {
    "_id": "60d3b41d8e28c13d3c11f111",
    "location": {
      "lat": 51.5074,
      "lng": -0.1278
    }
  }
}
```

## Validation Rules

### Registration
- Email must be valid and unique
- First name and last name must be 2-50 characters
- Password must be at least 6 characters
- Vehicle type must be one of: car, bike, auto
- Vehicle capacity must be at least 1
- Vehicle color must be at least 3 characters
- Vehicle plate must be unique and at least 3 characters

### Location Update
- Latitude and longitude must be valid coordinates
- Authentication token required

### Status Update
- Status must be either "active" or "inactive"
- Authentication token required