# API Documentation: `/users/register` and `/users/login`

## Endpoint: `/users/register`

### Description:

This endpoint is used to register a new user in the system. The user must provide their first name, email, and password, while the last name is optional. The endpoint validates the input and creates a new user if all required fields are valid.

---

### HTTP Method:

`POST`

---

### Request Body:

The endpoint expects a JSON object in the request body with the following structure:

#### Fields:

| Field              | Type   | Required | Description                                          |
| ------------------ | ------ | -------- | ---------------------------------------------------- |
| fullName           | Object | Yes      | An object containing the user's first and last name. |
| fullName.firstName | String | Yes      | First Name (minimum 3 characters).                   |
| fullName.lastName  | String | No       | Last Name (minimum 3 characters).                    |
| email              | String | Yes      | A valid email address.                               |
| password           | String | Yes      | Password (minimum 6 characters).                     |

#### Example Request:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

---

### Validation Rules:

- `fullName.firstName`: Must be at least 3 characters long.
- `fullName.lastName`: Optional but must be at least 3 characters long if provided.
- `email`: Must be a valid email format.
- `password`: Must be at least 6 characters long.

---

### Responses:

#### Success:

| Status Code | Description                  | Example Response |
| ----------- | ---------------------------- | ---------------- |
| `200`       | User registered successfully | ```json          |

{
"token": "eyJhbGciOiJIUzI1NiIsInR5...",
"user": {
"\_id": "648f93d2304b523452f78910",
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "johndoe@example.com",
"createdAt": "2023-12-01T10:00:00.000Z",
"updatedAt": "2023-12-01T10:00:00.000Z"
},
"message": "User created successfully"
}

````

#### Error:
| Status Code | Description                                 | Example Response                                                                                  |
|-------------|---------------------------------------------|--------------------------------------------------------------------------------------------------|
| `400`       | Validation errors in request body           | ```json
{
  "errors": [
    {
      "msg": "First Name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```                                                                                     |
| `500`       | Internal server error                      | ```json
{
  "message": "An unexpected error occurred"
}
````

---

### Notes:

- Passwords are hashed before saving to the database for security.
- The `email` field must be unique; otherwise, a conflict error will occur.
- A JWT token is returned upon successful registration, which can be used for authentication in subsequent requests.

---

## Endpoint: `/users/login`

### Description:

This endpoint is used to log in an existing user. It validates the provided email and password, verifies the credentials, and returns a JWT token if successful.

---

### HTTP Method:

`POST`

---

### Request Body:

The endpoint expects a JSON object in the request body with the following structure:

#### Fields:

| Field    | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| email    | String | Yes      | A valid email address.           |
| password | String | Yes      | Password (minimum 6 characters). |

#### Example Request:

```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

---

### Validation Rules:

- `email`: Must be a valid email format.
- `password`: Must be at least 6 characters long.

---

### Responses:

#### Success:

| Status Code | Description                 | Example Response |
| ----------- | --------------------------- | ---------------- |
| `200`       | User logged in successfully | ```json          |

{
"token": "eyJhbGciOiJIUzI1NiIsInR5...",
"user": {
"\_id": "648f93d2304b523452f78910",
"email": "johndoe@example.com",
"createdAt": "2023-12-01T10:00:00.000Z",
"updatedAt": "2023-12-01T10:00:00.000Z"
},
"message": "User logged in successfully"
}

````

#### Error:
| Status Code | Description                           | Example Response                                                                                  |
|-------------|---------------------------------------|--------------------------------------------------------------------------------------------------|
| `400`       | Validation errors in request body     | ```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```                                                                                     |
| `401`       | Invalid email or password             | ```json
{
  "message": "Invalid email or password"
}
```                                                                                     |
| `500`       | Internal server error                | ```json
{
  "message": "An unexpected error occurred"
}
````

---

### Notes:

- Passwords are stored in a hashed format and validated during login.
- If the email or password is incorrect, a `401 Unauthorized` error is returned.
- A JWT token is returned upon successful login for use in subsequent requests.
