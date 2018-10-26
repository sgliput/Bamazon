var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("markdown-table");

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

//SELECT query statement with JOIN clause supplies the proper information to everything below
connection.query(`SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS product_sales
FROM departments
INNER JOIN products
ON departments.department_name=products.department_name
GROUP BY department_id
ORDER BY department_id`, function (err, res) {
        if (err) throw err;
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
                            //ensures that department name is not a number and that the overhead value is
                            if (!isNaN(answer.deptName)) {
                                console.log("Improper department name.");
                            } else if (isNaN(answer.overhead)) {
                                console.log("Overhead value must be a number.");
                            } else {
                                //inserts new department info into departments table
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
                } else if (answer.options === "View Product Sales By Department") {
                    console.log("\n");
                    //arrays for storing values for each column in the markdown table
                    var deptid = [];
                    var departments = [];
                    var overhead = [];
                    var sales = [];
                    var totals = [];
                    for (var i = 0; i < res.length; i++) {
                        deptid.push(res[i].department_id);
                        departments.push(res[i].department_name);
                        overhead.push(res[i].over_head_costs.toFixed(2));
                        //if statement allows for displaying null values and, if not null, displaying two decimal places
                        if (res[i].product_sales !== null) {
                            sales.push(res[i].product_sales.toFixed(2));
                        } else {
                            sales.push(res[i].product_sales);
                        }
                        var profit = res[i].product_sales - res[i].over_head_costs;
                        totals.push(profit.toFixed(2));
                    }

                    //function for generating arrays that will form each row of markdown table
                    var addArray = function (index) {
                        var tableArray = [];
                        tableArray.push(deptid[index], departments[index], overhead[index], sales[index], totals[index]);
                        return tableArray;
                    }

                    //function for combining header row array and other row arrays into one big array for displaying as a table
                    var addArray2 = function () {
                        var arrayofArrays = [];
                        arrayofArrays.push(["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"]);
                        for (var j = 0; j < res.length; j++) {
                            arrayofArrays.push(addArray(j));
                        }
                        return arrayofArrays;
                    }

                    //markdown table displays data from big array of arrays
                    console.log(table(addArray2()));
                    connection.end();
                };



            });
    });
