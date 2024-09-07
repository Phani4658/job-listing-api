# API Documentation

This documentation provides a comprehensive overview of the API endpoints for managing users and job listings.

---

## User API

### **1. User Signup**

**Endpoint:** `POST /api/user/signup`  
**Description:** Registers a new user.  
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "github_url": "string"  // Optional
}
```
**Responses:**
- **201 Created**
  ```json
  {
    "error": false,
    "message": "User created successfully",
    "user": {
      "username": "string",
      "email": "string",
      "points": "number",
      "github_url": "string",
      "_id": "string"
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error": true,
    "message": "Email already exists"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **2. User Login**

**Endpoint:** `POST /api/user/login`  
**Description:** Authenticates a user and returns tokens.  
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "access_token": "string",
    "message": "User logged in successfully",
    "user": {
      "name": "string",
      "email": "string",
      "points": "number",
      "github_url": "string",
      "_id": "string"
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "error": true,
    "message": "Email or password is wrong"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **3. Refresh Token**

**Endpoint:** `POST /api/user/refresh`  
**Description:** Refreshes the access token using the refresh token.  
**Request Body:**
```json
{
  "user": "{ user_id: 'string', ... }" // User data containing user_id
}
```
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "user": {
      "name": "string",
      "email": "string",
      "points": "number",
      "github_url": "string",
      "_id": "string"
    },
    "access_token": "string",
    "message": "Token refreshed successfully"
  }
  ```
- **407 Proxy Authentication Required**
  ```json
  {
    "error": true,
    "status": 407,
    "message": "Refresh token is not valid or not found. Login Again."
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **4. Validate Token**

**Endpoint:** `POST /api/user/validate`  
**Description:** Validates the access token.  
**Request Body:**
```json
{
  "access_token": "string"
}
```
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "message": "Token is valid"
  }
  ```
- **500 Internal Server Error** (if token is not valid)
  ```json
  "Internal Server Error"
  ```

### **5. List Users**

**Endpoint:** `GET /api/user`  
**Description:** Retrieves a list of users, sorted by points.  
**Middleware:** `validateToken`  
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "users": [
      {
        "name": "string",
        "email": "string",
        "points": "number",
        "github_url": "string",
        "_id": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **6. Like User**

**Endpoint:** `PUT /api/user/like/:user_id`  
**Description:** Increases the points of a user by 1.  
**Middleware:** `validateToken`  
**URL Params:**
- `user_id` (string) - ID of the user to like.  
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "message": "User liked successfully"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": true,
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **7. Update User**

**Endpoint:** `PUT /api/user/update/:user_id`  
**Description:** Updates user details.  
**Middleware:** `validateToken`  
**URL Params:**
- `user_id` (string) - ID of the user to update.  
**Request Body:**
```json
{
  "update_data": {
    "name": "string",
    "email": "string",
    "points": "number",
    "github_url": "string"
  }
}
```
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "user": {
      "name": "string",
      "email": "string",
      "points": "number",
      "github_url": "string",
      "_id": "string"
    }
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": true,
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **8. Delete User**

**Endpoint:** `DELETE /api/user/delete/:user_id`  
**Description:** Deletes a user.  
**Middleware:** `validateToken`  
**URL Params:**
- `user_id` (string) - ID of the user to delete.  
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "message": "User deleted successfully"
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": true,
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

### **9. Get User Data**

**Endpoint:** `GET /api/user/:user_id`  
**Description:** Retrieves user data by ID.  
**Middleware:** `validateToken`  
**URL Params:**
- `user_id` (string) - ID of the user to retrieve.  
**Responses:**
- **200 OK**
  ```json
  {
    "error": false,
    "user": {
      "name": "string",
      "email": "string",
      "points": "number",
      "github_url": "string",
      "_id": "string"
    }
  }
  ```
- **404 Not Found**
  ```json
  {
    "error": true,
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**
  ```json
  "Internal Server Error"
  ```

---

## Job API

### **1. Add Job**

**Endpoint:** `POST /api/job`  
**Description:** Creates a new job listing.  
**Request Body:**
```json
{
  "title": "string",
  "date": "YYYY-MM-DDTHH:MM:SSZ",  // ISO 8601 date format
  "link": "string",
  "applied_users": []  // Optional, should be an array of user IDs
}
```
**Responses:**
- **201 Created**
  ```json
  {
    "title": "string",
    "date": "YYYY-MM-DDTHH:MM:SSZ",
    "link": "string",
    "applied_users": []
  }
  ```
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

### **2. Get Job**

**Endpoint:** `GET /api/job/:jobId`  
**Description:** Retrieves a specific job listing by its ID.  
**URL Params:**
- `jobId` (string) - ID of the job to retrieve.  
**Responses:**
- **200 OK**
  ```json
  {
    "title": "string",
    "date": "YYYY-MM-DDTHH:MM:SSZ",
    "link": "string",
    "applied_users": []
  }
  ```
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

### **3. Modify Job**

**Endpoint:** `PUT /api/job/:jobId`  
**Description:** Updates an existing job listing by its ID.  
**URL Params:**
- `jobId` (string) - ID of the job to update.  
**Request Body:**
```json
{
  "title": "string",
  "date": "YYYY-MM-DDTHH:MM:SSZ",
  "link": "string",
  "applied_users": []  // Optional, should be an array of user IDs
}
```
**Responses:**
- **200 OK**
  ```json
  {
    "title": "string",
    "date": "YYYY-MM-DDTHH:MM:SSZ",
    "link": "string",
    "applied_users": []
  }
  ```
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

### **4. Delete Job**

**Endpoint:** `DELETE /api/job/:jobId`  
**Description:** Deletes a job listing by its ID.  
**URL Params:**
- `jobId` (string) - ID of the job to delete.  
**Responses:**
- **204 No Content**
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

### **5. List Jobs**

**Endpoint:** `GET /api/job`  
**Description:** Retrieves a list of all job listings.  
**Responses:**
- **200 OK**
  ```json
  [
    {
      "title": "string",
      "date": "YYYY-MM-DDTHH:MM:SSZ",
      "link": "string",
      "applied_users": []
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

### **6. Apply for Job**

**Endpoint:** `POST /api/job/:jobId/apply`  
**Description:** Applies for a job by adding the user ID to the job's `applied_users` list.  
**Middleware:** Authenticates user (e.g., via token).  
**URL Params:**
- `jobId` (string) - ID of the job to apply for.  
**Request Body:** No body needed.  
**Responses:**
- **200 OK**
  ```json
  "Applied job successfully"
  ```
- **400 Bad Request**
  ```json
  "Missing user or job ID"
  ```
- **500 Internal Server Error**
  ```json
  "Server Error"
  ```

---

### Notes

- **Authentication Required:** Some endpoints require user authentication and are protected by middleware.
- **Error Handling:** Each endpoint handles errors by returning appropriate HTTP status codes and messages.

