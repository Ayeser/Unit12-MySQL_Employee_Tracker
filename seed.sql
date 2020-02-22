DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INTEGER(4) AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER(4) AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary INTEGER(9) NULL,
    department_id INTEGER(4) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER(4) NOT NULL,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL,
    role_id INTEGER(4) NULL,
    manager_id INTEGER(4) NULL,
    PRIMARY KEY (id)
);