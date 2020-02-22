const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_trackerdb"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

try {inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role"],
            name: "set"
        }
    ])
    .then(function (response) {
        console.log("Great! Next step...");
        console.log(response.set);
        if (response.set === "Add department") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of the department",
                    name: "department"
                }
                    .then(function (response) {
                        const query = connection.query(
                            "INSERT INTO department (name) + VALUES (" + name + ")", function (err, res) {
                                if (err) throw err;
                            }
                        )
                        console.log("Department Successfully added! Departments are now: ")
                        console.log(query.sql);
                        connection.end();
                    })
            ])
        }

        if (response.set === "Add role") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is this role's title?",
                    name: "title"
                },
                {
                    type: "number",
                    message: "What is the salary for this role?",
                    name: "salary"
                },
                {
                    type: "input",
                    message: "What department does this role belong in?",
                    name: "department_name"
                }
            ])
                .then(function (response) {
                    const query = connection.query(
                        "INSERT INTO role (title, salary, department_id) + VALUES (" + response.title, response.salary, response.department_name + ")", function (err, res) {
                            if (err) throw err;
                        }
                    )
                    console.log("Department Successfully added! Departments are now: ")
                    console.log(query.sql);
                    connection.end();
                })
        }

        if (response.set === "Add employee") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is this employee's first name?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "What is this employee's last name?",
                    name: "last_name"
                },
                {
                    type: "input",
                    message: "What is this employee's role?",
                    name: "role_id"
                },
                {
                    type: "input",
                    message: "Who is this employee's manager?",
                    name: "manager_id"
                }
            ])
                .then(function (response) {
                    const query = connection.query(
                        "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) + VALUES (" + response.first_name, response.last_name, response.role_id, response.manager_id + ")", function (err, res) {
                            if (err) throw err;
                        }
                    )
                    console.log("Department Successfully added! Departments are now: ")
                    console.log(query.sql);
                    connection.end();

                })
        }
        if (response.set === "View departments") {
            const query = connection.query(
                "SELECT * FROM department", function (err, res) {
                    if (err) throw err;
                });
            console.log(query.sql);
            console.table(query.sql);
            connection.end();
        }

        if (response.set === "View roles") {
            const query = connection.query(
                "SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                }
            )
            console.log(query.sql);
            console.table(query.sql);
            connection.end();
        }
        if (response.set === "View employees") {
            const query = connection.query(
                "SELECT * FROM employee", function (err, res) {
                    if (err) throw err;
                }
            )
            console.log(query.sql);
            console.table(query.sql);
            connection.end();
        }

        if (response.set === "Update employee role") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name who is changing role?",
                    name: "first_name",
                },
                {
                    type: "input",
                    message: "What is the employee's last name who is changing role?",
                    name: "last_name"
                },
                {
                    type: "input",
                    message: "What role does this employee now have?",
                    name: "role_id"
                }
            ])
                .then(function (response) {
                    const query = connection.query(
                        "UPDATE employee (first_name, last_name, role_id, manager_id) + set first_name - " + response.first_name + " last_name = " + response.last_name + " role_id = " + response.role_id + " manager_id = " + response.manager_id + " WHERE id = ", function (err, res) {
                            if (err) throw err;
                        }
                    )
                    console.log(query.sql);
                    console.table(query.sql);
                    connection.end();
                })
        }

    })


    catch(error) {
        console.error(error);
    };

