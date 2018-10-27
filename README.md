# Bamazon

## Overview

This Bamazon app uses Node.js and a MySQL database and operates in the command line, offering a Node-based alternative to other more elaborate online shopping sites. The schema.sql file contains the SQL needed to create your bamazon database and tables in MySQL, with insertions and alterations in the seeds.sql file. The app consists of three main files: bamazonCustomer.js for buying products, bamazonManager.js for handling inventory, and bamazonSupervisor.js for handling departments. All three use the mysql and inquirer NPM packages, and bamazonSupervisor.js also uses the markdown-table NPM package.

## bamazonCustomer.js

Typing "node bamazonCustomer.js" in the command line will yield a listing of every product in the database, including its ID #, name, and price, followed by a prompt to enter the product ID of the desired item. It then asks how many of that item the customer wants to buy. The isNaN() function insists that these inputs are numbers, and validation ensures that the customer chooses one of the IDs listed and that the amount requested doesn't exceed the stock inventory.

An SQL UPDATE statement subtracts the amount ordered from the item's inventory and adds the total sale amount (price * amount) to the product_sales column. If no error is returned, then it logs a confirmation of the item bought, the amount, and the total price, as shown below.

![Bamazon Screenshot 1](/images/bamazonScreenshot1.png)

## bamazonManager.js

Typing "node bamazonManager.js" in the command line will yield an option list, courtesty of inquirer. Choosing "View Products for Sale" will display all products being offered, much like bamazonCustomer.js, though now showing the stock quantity as well, as shown below.

![Bamazon Screenshot 2](/images/bamazonScreenshot2.png)

Choosing "View Low Inventory" will display those items with a quantity of five or less, as shown below.

![Bamazon Screenshot 3](/images/bamazonScreenshot3.png)

Choosing "Add to Inventory"  will prompt the user for the product they wish to add to. As seen in the image above, the options are displayed in a looping list, which includes a separator when the list starts over. After the product is selected, it asks for the amount you wish to add, and validation ensures it only accepts a number.

An UPDATE statement is then sent to the Bamazon database, increasing the stock_quantity amount (or a negative amount would decrease it, if desired), and after that, a confirmation message says that amount of the product was added, as seen below.

![Bamazon Screenshot 4](/images/bamazonScreenshot4.png)

When you choose "Add New Product," it asks a series of questions about the new product, including its name, department, price, and initial stock quantity. The department question also displays the list of departments as a looped list with a separator at the end. After validation ensures that the product and department are not numbers and that the price and quantity are numbers, an INSERT INTO statement then adds the new product values to the products table, and a confirmation statement shows what was added, as seen in the screenshot above.

## bamazonSupervisor.js

Typing "node bamazonSupervisor.js" yields a short option list with inquirer. Choosing "Create New Department" is much like creating a new product in bamazonManager.js. A prompt asks for the name (validated as not a number) and overhead costs (validated as a number) and does an INSERT INTO query to the departments table, logging a confirmation of what was added (see bottom screenshot).

Choosing "View Product Sales By Department" draws data from a special SELECT statement with an INNER JOIN to combine the department_id, department_name, and over_head_costs columns from the departments table and the SUM of each department's product_sales from the products table (a GROUP BY clause gets rid of repeats, and an ORDER BY clause puts them in order by department_id). An if statement allows for the possibility of a null value in the product_sales column, and the total sales for each department are calculated by subtracting the overhead costs from the product sales.

The values from each of these columns are pushed into their own array, and then two functions use those arrays to generate arrays that correspond to each row in the MySQL database (department_id, department_name, over_head_costs, product_sales, totalProfit). Using the markdown-table NPM package, these arrays are displayed as a markdown table in the command line, as seen below.

![Bamazon Screenshot 5](/images/bamazonScreenshot5.png)