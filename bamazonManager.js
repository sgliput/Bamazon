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
                    console.log(`   ID #: ${res[i].item_id} || Product: ${res[i].product_name} || Price: ${res[i].price} || Quantity: ${res[i].stock_quantity}`);
                }
                console.log("\n");

            } else if (answer.options === "View Low Inventory") {
                console.log("\nProducts with Low Inventory (5 or Less):\n");
                for (var j = 0; j < res.length; j++) {
                    if (res[j].stock_quantity < 5) {
                        console.log(`   ID #: ${res[j].item_id} || Product: ${res[j].product_name} || Price: ${res[j].price} || Quantity: ${res[j].stock_quantity}`);
                    }
                }
                console.log("\n");
            } else if (answer.options === "Add to Inventory") {

            }

        });
        connection.end();

    });