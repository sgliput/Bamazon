var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

inquirer
    .prompt({
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product Sales By Department",
            "Create New Department"]
    })
    .then(function (answer) {
        if (answer.options === "Create New Department") {
            inquirer
                .prompt([{
                    name: "deptName",
                    type: "input",
                    message: "Type the name of the department you wish to add:"
                },
                {
                    name: "overhead",
                    type: "input",
                    message: "Type the projected overhead costs of the department:"
                },
                ])
                .then(function (answer) {
                    if (!isNaN(answer.deptName)) {
                        console.log("Improper department name.");
                    } else if (isNaN(answer.overhead)) {
                        console.log("Overhead value must be a number.");
                    } else {
                        connection.query("INSERT INTO departments SET ?",
                            {
                                department_name: answer.deptName,
                                over_head_costs: answer.overhead
                            },
                            function (err) {
                                if (err) throw err;
                                console.log("\nYou added the following department to the Bamazon database:");
                                console.log(`
                                    Department: ${answer.deptName}
                                    Overhead: ${answer.overhead}`);
                            }
                        )
                    }
                    connection.end();
                });
        }

    });