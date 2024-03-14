# Routes

## App contains the following routes:

- [Customer](#customer) (GET, POST, PUT, DELETE)
- [Service](#service) (GET, POST, PUT, DELETE)
- [User](#user) (GET, POST, PUT, DELETE)
- [Auth](#auth) (GET, POST)

## Customer

### GET /customer/:id

Returns a customer.

Response body:

```json
{
  "message": "Customer found",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123456"
  },
  "status": 200
}
 ```

### POST /customer

Creates a new customer.

Request body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "123456"
}
```

Response body:

```json
{
  "message": "Customer created",
  "data": {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123456"
  },
  "status": 201
}
```

### PUT /customer/:id

Updates a customer.

Request body:

```json
{
  "message": "Customer updated",
  "data": {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123456"
  },
  "status": 200
}
```

Response body:

```json
{
  "message": "Customer updated",
  "data": {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123456"
  },
  "status": 200
}
```

### DELETE /customer/:id

Deletes a customer.

Response body:

```json
{
  "message": "Customer updated",
  "data": {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123456"
  },
  "status": 200
}
```

## Service

### GET /service/:id

Returns a service.

Response body:

```json
{
  "message": "Service found",
  "data": {
    "id": 1,
    "name": "Service1",
    "description": "Service1Description",
    "price": "1.02",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

### POST /service

Creates a new service.

Request body:

```json
{
  "name": "Service1",
  "description": "Service1Description",
  "price": "1.02",
  "customer_id": 1
}
```

Response body:

```json
{
  "message": "Service created",
  "data": {
    "name": "Service1",
    "description": "Service1Description",
    "price": "1.02",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 201
}
```

### PUT /service/:id

Updates a service.

Request body:

```json
{
  "name": "Service1",
  "description": "Service1Description",
  "price": "1.02",
  "customer_id": 1
}
```

Response body:

```json
{
  "message": "Service updated",
  "data": {
    "id": "1",
    "name": "Service1",
    "description": "Service1Description",
    "price": "1.02",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

### DELETE /service/:id

Deletes a service.

Response body:

```json
{
  "message": "Service deleted",
  "data": {
    "id": "1"
  },
  "status": 200
}
```

## User

### GET /user:id

Returns a user.

Response body:

```json
{
  "message": "User found",
  "data": {
    "id": 1,
    "email": "john@doe.com",
    "role": "admin",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

### POST /user

Creates a new user.

Request body:

```json
{
  "email": "john@doe.com",
  "password": "john_doe_pass",
  "customer_id": 1,
  "role": "admin"
}
```

Response body:

```json
{
  "message": "User created",
  "data": {
    "email": "john@doe.com",
    "role": "admin",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 201
}
```

### PUT /user/:id

Updates a user.

Request body:

```json
{
  "email": "john@doe.com",
  "password": "john_doe_pass",
  "customer_id": 1,
  "role": "admin"
}
```

Response body:

```json
{
  "message": "User updated",
  "data": {
    "id": "1",
    "email": "john@doe.com",
    "role": "admin",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

### DELETE /user/:id

Deletes a user.

Response body:

```json
{
  "message": "User deleted",
  "data": {
    "id": "1"
  },
  "status": 200
}
```

## Auth

### GET /logged_user

Returns the logged user.

Response body:

```json
{
  "message": "Logged user found",
  "data": {
    "id": 1,
    "email": "john@doe.com",
    "role": "admin",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

### POST /login

Logs in a user.

Request body:

```json
{
  "email": "john@doe.com",
  "password": "john_doe_pass"
}
```

Response body:

```json
{
  "message": "Logged in",
  "data": {
    "id": 1,
    "email": "john@doe.com",
    "role": "admin",
    "customer": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123456"
    }
  },
  "status": 200
}
```

## [Back to top](#Routes)