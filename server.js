const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_trackerDB"
});

inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role"],
            name: "set"
        }
    ])
    .then(function (response) {
        if(response.set === "Add department") {
            inquirer.prompt([
                {
                    type: "input",
                    message:"What is the name of the department",
                    name:"department"
                }
                .then(function (response) {
                    INSERT INTO department (name)
                    VALUES (response.department);
                })
            ])
        }

        if(response.set === "Add role") {
            inquirer.prompt([
                {
                    type:"input",
                    message:"What is this role's title?"
                    name:"title"
                }
                {
                    type:"number",
                    message:"What is the salary for this role?"
                    name:"salary"
                }
                {
                    type: "input",
                    message:"What department does this role belong in?"
                    name:"department_name"
                }
            ])
            .then(function (response) {
                INSERT INTO role (title, salary, department_id)
                VALUES (response.title, response.salary, response.department_name);
            })
        }

        if(response.set === "Add employee") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is this employee's first name?"
                    name="first_name"
                }
                {
                    type: "input",
                    message: "What is this employee's last name?",
                    name="last_name"
                }
                {
                    type: "input",
                    message:"What is this employee's role?",
                    name:"role_id"
                }
                {
                    type:"input",
                    message:"Who is this employee's manager?",
                    name="manager_id"
                }
            ])
            .then(function (response) {
                INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
                VALUES (response.first_name, response.last_name, response.role_id, response.manager_id);
            })
        }
        if(response.set === "View departments") {
            SELECT * FROM department;
            console.table(department);
        }
        if(response.set === "View roles") {
            SELECT * FROM role;
            console.table(role);
        }
        if(response.set === "View employees") {
            SELECT * FROM employee;
            console.table(employee);
        }
        if(response.set === "Update employee role") {
            inquirer.prompt([
                {
                    type: "input",
                    message:"What is the employee's first name who is changing role?",
                    name:"first_name",
                }
                {
                    type:"input",
                    message:"What is the employee's last name who is changing role?",
                    name:"last_name"
                }
                {
                    type:"input",
                    message:"What role does this employee now have?",
                    name:"role_id"
                }
            ])
            .then(function (response) {
                UPDATE employee (first_name, last_name, role_id, manager_id)
                set first_name = response.first_name, last_name = response.last_name, response.role_id, response.manager_id
                WHERE id = 
            })
        }
    });

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});