DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock_quantity INT NOT NULL,
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lefon Portable Radio", "Electronics", 14.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Le Creuset Dutch Oven", "Cookware", 420.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo Laptop", "Electronics", 250.00, 84);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Wars Coaster Set", "Home", 6.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("John Deere Riding Lawn Mower", "Lawn and Gardening", 1499.00, 220);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Writing SQL Queries for Dummies", "Books", 19.99, 837);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleep Number Mattress", "Home", 999.00, 115);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Columbia Jacket", "Clothing", 49.99, 640);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rachael Ray Cookbook Set", "Books", 64.99, 232);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laminated Two-Dollar Bill", "Miscellaneous", 4.99, 2);

____________________________________________

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,2);

_____________________________________________

USE bamazon;

CREATE TABLE departments (
  department_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 4000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 5000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Dishware", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cookware", 3000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Miscellaneous", 4500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Lawn and Gardening", 5000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Art", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home", 2500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Automobile", 4200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 3800);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys", 250);