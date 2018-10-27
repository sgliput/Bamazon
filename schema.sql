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

______________________________________________________________

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,2);

______________________________________________________________

CREATE TABLE departments (
  department_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL
);