# Captain API Documentation

## Register Captain Endpoint

### `POST /captains/register`

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

### Example Requests

#### Car Driver Registration
```bash
curl -X POST http://localhost:4000/captains/register \
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

#### Bike Driver Registration
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Mike",
      "lastname": "Rider"
    },
    "email": "mike.rider@example.com",
    "password": "bikepass456",
    "vehicle": {
      "vehicleType": "bike",
      "capacity": 1,
      "color": "red",
      "plate": "BK789"
    }
  }'
```

#### Auto Rickshaw Driver Registration
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Raj",
      "lastname": "Kumar"
    },
    "email": "raj.kumar@example.com",
    "password": "autopass789",
    "vehicle": {
      "vehicleType": "auto",
      "capacity": 3,
      "color": "yellow",
      "plate": "AUTO456"
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

## Login Captain Endpoint

### `POST /captains/login`

Authenticates a captain and returns a JWT token.

### Request Body
```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Requests

#### Standard Login
```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.driver@example.com",
    "password": "secure123"
  }'
```

#### JavaScript/Fetch Example
```javascript
const response = await fetch('http://localhost:4000/captains/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.driver@example.com',
    password: 'secure123'
  })
});

const data = await response.json();
console.log('Login successful:', data);
```

### Success Response (200 OK)
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
    }
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "message": "Invalid email or password"
}
```

## Get Captain Profile

### `GET /captains/profile`

Gets the authenticated captain's profile information.

### Headers Required
```
Authorization: Bearer <token>
```

### Example Requests

#### Using cURL
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Using JavaScript/Fetch
```javascript
const token = localStorage.getItem('captainToken'); // Assuming token is stored

const response = await fetch('http://localhost:4000/captains/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const profile = await response.json();
console.log('Captain Profile:', profile);
```

#### Using Cookie Authentication
```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Success Response (200 OK)
```json
{
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

## Logout Captain

### `GET /captains/logout`

Logs out the captain by blacklisting their token.

### Headers Required
```
Authorization: Bearer <token>
```

### Example Requests

#### Using cURL
```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Using JavaScript/Fetch
```javascript
const token = localStorage.getItem('captainToken');

const response = await fetch('http://localhost:4000/captains/logout', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
if (response.ok) {
  localStorage.removeItem('captainToken'); // Clear token from storage
  console.log('Logged out successfully');
}
```

### Success Response (200 OK)
```json
{
  "message": "Logged out successfully"
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

### Login
- Email must be valid
- Password must be at least 6 characters

### Authentication
- JWT token required for protected routes (profile, logout)
- Token expires after 24 hours
- Logged out tokens are blacklisted

## Available Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/captains/register` | Register new captain | No |
| POST | `/captains/login` | Login captain | No |
| GET | `/captains/profile` | Get captain profile | Yes |
| GET | `/captains/logout` | Logout captain | Yes |

## Error Responses

### 400 Bad Request
Validation errors or invalid data format

### 401 Unauthorized  
Missing or invalid authentication token

### 500 Internal Server Error
Server-side errors

## Complete Usage Example

Here's a complete workflow example showing how to register, login, get profile, and logout:

```javascript
// 1. Register a new captain
const registerResponse = await fetch('http://localhost:4000/captains/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: { firstname: "Sarah", lastname: "Wilson" },
    email: "sarah.wilson@example.com",
    password: "mypassword123",
    vehicle: {
      vehicleType: "car",
      capacity: 4,
      color: "white",
      plate: "SW2024"
    }
  })
});

const registerData = await registerResponse.json();
const token = registerData.token;

// 2. Get captain profile
const profileResponse = await fetch('http://localhost:4000/captains/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const profile = await profileResponse.json();
console.log('Captain Profile:', profile.captain);

// 3. Logout
const logoutResponse = await fetch('http://localhost:4000/captains/logout', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const logoutResult = await logoutResponse.json();
console.log(logoutResult.message); // "Logged out successfully"
```

## Testing with Postman

### Environment Variables
Create these variables in Postman:
- `baseUrl`: `http://localhost:4000`
- `captainToken`: (will be set automatically after login)

### Collection Structure
1. **Register Captain** - POST `{{baseUrl}}/captains/register`
2. **Login Captain** - POST `{{baseUrl}}/captains/login`
   - In Tests tab, add: `pm.environment.set("captainToken", pm.response.json().token);`
3. **Get Profile** - GET `{{baseUrl}}/captains/profile`
   - In Headers: `Authorization: Bearer {{captainToken}}`
4. **Logout** - GET `{{baseUrl}}/captains/logout`
   - In Headers: `Authorization: Bearer {{captainToken}}`