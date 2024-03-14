CREATE DATABASE IF NOT EXISTS `db`;
USE `db`;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS customer;

CREATE TABLE customer
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    phone      VARCHAR(28) NOT NULL UNIQUE
);

CREATE TABLE service
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    customer_id INT            NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE TABLE role
(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO role (name)
VALUES ('admin');
INSERT INTO role (name)
VALUES ('user');

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