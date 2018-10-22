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

connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("\n");
    for (var i = 0; i < res.length; i++) {
        console.log(`   ID #: ${res[i].item_id} || Product: ${res[i].product_name} || Price: ${res[i].price}`);
    }
    console.log("\n");
    inquirer
        .prompt([
            {
                type: "input",
                name: "askID",
                message: "Want to buy something? Type its product ID!"
            },
            {
                type: "input",
                name: "askAmount",
                message: "How many would you like to buy?"
            }
        ])
        .then(function (answer) {
            var id = answer.askID;
            var amount = answer.askAmount;
            
            if(isNaN(amount) || isNaN(id)){
                console.log("Improper input. Please try again.");
            } else if (res[id - 1].stock_quantity > amount) {
                var totalAmount = res[id - 1].price * amount;
                console.log(`Fulfilling your order for ${amount} ${res[id - 1].product_name}(s)...`);
                
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: (res[id - 1].stock_quantity - amount)
                        },
                        {
                            item_id: id
                        }
                    ], function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Your purchase for ${amount} ${res[id - 1].product_name}(s) has been successfully placed!`);
                            console.log("Your total price is $" + totalAmount + ".");
                            connection.end();
                        }
                    }
                );
            } else {
                console.log("Insufficient quantity!");
                connection.end();
            }

        });
});