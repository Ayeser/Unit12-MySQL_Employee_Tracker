DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id int AUTO_INCREMENT,
    deptName VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id int AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INTEGER(6) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id int AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id VARCHAR(30) NULL,
    manager_id VARCHAR(30) NULL,
    PRIMARY KEY (id)
);