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
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"]
    })
    .then(function (answer) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            if (answer.options === "View Products for Sale") {
                console.log("\nAll Products:\n");
                for (var i = 0; i < res.length; i++) {
                    console.log(`   ID #: ${res[i].item_id} || Product: ${res[i].product_name} || Price: $${res[i].price} || Quantity: ${res[i].stock_quantity}`);
                }
                console.log("\n");
                connection.end();

            } else if (answer.options === "View Low Inventory") {
                console.log("\nProducts with Low Inventory (5 or Less):\n");
                for (var j = 0; j < res.length; j++) {
                    if (res[j].stock_quantity < 5) {
                        console.log(`   ID #: ${res[j].item_id} || Product: ${res[j].product_name} || Price: $${res[j].price} || Quantity: ${res[j].stock_quantity}`);
                    }
                }
                console.log("\n");
                connection.end();
            } else if (answer.options === "Add to Inventory") {
                inquirer
                    .prompt([{
                        name: "options",
                        type: "list",
                        message: "What product would you like to add to?",
                        choices: function () {
                            var optionArray = [];
                            optionArray.push(new inquirer.Separator());
                            for (var k = 0; k < res.length; k++) {
                                optionArray.push(res[k].product_name);
                            }
                            return optionArray;
                        }
                    },
                    {
                        name: "howMuch",
                        type: "input",
                        message: "How many would you like to add?"
                    }
                    ])
                    .then(function (answer) {
                        var product = answer.options;
                        var howMuch = parseInt(answer.howMuch);

                        if (!isNaN(howMuch)) {
                            for (var l = 0; l < res.length; l++) {
                                if (product === res[l].product_name) {
                                    var id = res[l].item_id;
                                }
                            }

                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: (res[id - 1].stock_quantity + howMuch)
                                    },
                                    {
                                        product_name: product
                                    }
                                ], function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(`You added ${howMuch} ${product}(s).`);
                                        connection.end();
                                    }


                                });
                        } else {
                            console.log("Improper input!");
                            connection.end();
                        }
                    })
            } else if (answer.options === "Add New Product") {
                connection.query("SELECT * FROM departments", function (err, res2) {
                    if (err) throw err;
                    var departments = [];
                    departments.push(new inquirer.Separator());
                    for (var k = 0; k < res2.length; k++) {
                        departments.push(res2[k].department_name);
                    }

                    inquirer
                        .prompt([{
                            name: "insertName",
                            type: "input",
                            message: "Type the name of the product you wish to add:"
                        },
                        {
                            name: "insertDept",
                            type: "list",
                            message: "Choose the department the product is under:",
                            choices: departments
                        },
                        {
                            name: "insertPrice",
                            type: "input",
                            message: "Type the typical price of the product:"
                        },
                        {
                            name: "insertStock",
                            type: "input",
                            message: "Type the initial stock quantity of the product:"
                        }
                        ])
                        .then(function (answer) {
                            if (!isNaN(answer.insertName)) {
                                console.log("Improper product name.");
                            } else if (!isNaN(answer.insertDept)) {
                                console.log("Improper department name.");
                            } else if (isNaN(answer.insertPrice)) {
                                console.log("Price must be a number.");
                            } else if (isNaN(answer.insertStock)) {
                                console.log("Stock quantity must be a number.");
                            } else {
                                connection.query("INSERT INTO products SET ?",
                                    {
                                        product_name: answer.insertName,
                                        department_name: answer.insertDept,
                                        price: answer.insertPrice,
                                        stock_quantity: answer.insertStock
                                    },
                                    function (err) {
                                        if (err) throw err;
                                        console.log("\nYou added the following product to the Bamazon database:");
                                        console.log(`
                                    Product: ${answer.insertName}
                                    Department: ${answer.insertDept}
                                    Price: ${answer.insertPrice}
                                    Stock: ${answer.insertStock}`);
                                    }
                                )
                            }
                            connection.end();
                        });
                });
            }

        });


    });