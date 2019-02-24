CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    id INT (10)
    auto_increment NOT NULL,
    product_name VARCHAR
    (50),
    department_name VARCHAR
    (50),
    price DECIMAL
    (10,2),
    stock_quantity INT
    (10),
    primary key (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("NVIDIA 1070GTX", "Graphics Cards", "450.00, 10")

