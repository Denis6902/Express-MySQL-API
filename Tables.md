# Database

SQL file is located in the `src/database` folder with the name `db.sql`.

``` sql
CREATE DATABASE IF NOT EXISTS `db`;
USE `db`;
```

# Tables

The database structure is as follows:

- `customer` - stores customers data
- `service` - stores services data
- `user` - stores users data
- `role` - stores roles data

## Customer

| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| id         | int          | NO   | PRI | NULL    | auto_increment |
| first_name | varchar(255) | NO   |     | NULL    |                |
| last_name  | varchar(255) | NO   |     | NULL    |                |
| phone      | varchar(28)  | NO   | UNI | NULL    |                |

``` sql
CREATE TABLE customer
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    phone      VARCHAR(28) NOT NULL UNIQUE
);
```

## Service

| Field       | Type          | Null | Key | Default | Extra          |
|-------------|---------------|------|-----|---------|----------------|
| id          | int           | NO   | PRI | NULL    | auto_increment |
| name        | varchar(255)  | NO   |     | NULL    |                |
| description | text          | NO   |     | NULL    |                |
| price       | decimal(10,2) | NO   |     | NULL    |                |
| customer_id | int           | NO   | MUL | NULL    |                |

``` sql
CREATE TABLE service
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    customer_id INT            NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);
```

## User

| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| id          | int          | NO   | PRI | NULL    | auto_increment |
| email       | varchar(255) | NO   | UNI | NULL    |                |
| password    | varchar(255) | NO   |     | NULL    |                |
| customer_id | int          | NO   | UNI | NULL    |                |
| role_id     | int          | NO   |     | NULL    |                |

``` sql
CREATE TABLE user
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    customer_id INT          NOT NULL UNIQUE,
    role_id     INT          NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);
```

## Role

| Field | Type         | Null | Key | Default | Extra          |
|-------|--------------|------|-----|---------|----------------|
| id    | int          | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | NO   |     | NULL    |                |

``` sql
CREATE TABLE role
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```