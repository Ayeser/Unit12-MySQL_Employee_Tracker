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
    password: "",
    database: "employee_trackerdb"
});

function startInput() {
    try {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee role", "Exit application"],
                    name: "set"
                }
            ])
            .then(function (response) {
                console.log("Great! Next step...");
                if (response.set === "Add department") {
                    inquirer.prompt([
                        {
                            type: "input",
                            message: "What is the name of the department",
                            name: "department"
                        }
                    ])
                        .then(function (response) {
                            console.log(response.department);
                            connection.query(`INSERT INTO department (deptName) VALUES ('${response.department}')`, function (err, res) {
                                if (err) throw err;
                            }
                            );
                            console.log("Department Successfully added!");
                            startInput();
                        })
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
                            connection.query(
                                `INSERT INTO roles (title, salary, department_name) VALUES ("${response.title}, ${response.salary}, ${response.department_name}")`, function (err, res) {
                                    if (err) throw err;
                                }
                            );
                            console.log("Role successfully added!");
                            startInput();
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
                            query = connection.query(
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}, ${response.last_name}, ${response.role_id}, ${response.manager_id}")`, function (err, res) {
                                    if (err) throw err;
                                }
                            )
                            console.log("Employee successfully added!");
                            startInput();
                        })
                }
                if (response.set === "View departments") {
                    connection.query(
                        "SELECT * FROM department", function (err, res) {
                            if (err) throw err;
                            console.table(res);
                        });
                        startInput();
                }

                if (response.set === "View roles") {
                    connection.query(
                        "SELECT * FROM roles", function (err, res) {
                            if (err) throw err;
                            console.table(res);
                        }
                    )
                    startInput();
                }
                if (response.set === "View employees") {
                    connection.query(
                        "SELECT * FROM employee", function (err, res) {
                            if (err) throw err;
                            console.table(res);
                        }
                    )
                    startInput();
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
                            connection.query(
                                `UPDATE employee (first_name, last_name, role_id, manager_id) + set first_name - " ${response.first_name} " last_name = " + ${response.last_name} + " role_id = " + ${response.role_id} + " manager_id = " + ${response.manager_id} + " WHERE id = 1`, function (err, res) {
                                    if (err) throw err;
                                }
                            )
                            startInput();
                        })
                }

                if (response.set === "Exit application") {
                    connection.end();
                }

            })

    }
    catch (error) {
        console.error(error);
    };
};

startInput();
