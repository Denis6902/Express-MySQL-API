# API in Express with MySQL

## Description

The application will be used to manage customers and their services, and will include methods such as:

- customer creation
- creating a service under a given customer
- create a user under a given customer
- creating an admin user
- and others (delete, edit, etc.) — it is unnecessary to implement everything see below

So there will be 2 types of users (2 ROLE):

- Admin (has access to all customers and their services)
- Customer (has access only to their services)

## Requirements

- Node.js
- MySQL
- Express
- Git
- Postman (or other API testing tool)

## How to use

1. Clone the repository with `git clone`
2. Install the dependencies with `npm install`
3. Configure the database connection, port and jwt secret in the `.env` file.
4. Create tables (more info in “Create tables” section)
5. Run the application with `npm start` or `npm run dev`
6. Use Postman or other API testing tool to send requests to the server

## Routes

More info in [`routes.md`](./Routes.md)

## Create tables

More info in [`tables.md`](./Tables.md)

## TODO

- [x] Add authentication and authorization
- [x] Change database structure