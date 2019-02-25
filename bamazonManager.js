var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Halflives2!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Please select your function",
                choices: ["View Inventory", "View Low Stock", "Add to Inventory", "Add New Product"],
                name: "task"
            }
        ]).then(function (managerRes) {
            if (managerRes.task === "View Inventory") {
                listInventory();
            }
            else if (managerRes.task === "View Low Stock") {
                lowStock();
            }
            else if (managerRes.task === "Add to Inventory") {
                addItem();
            }
        })
};

function listInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log("ID: " + data[i].id + " || Department Name: " + data[i].department_name + " || Item: " + data[i].product_name + " || Price: $" + data[i].price + " || Total Inventory: " + data[i].stock_quantity + " units" + "\n" + "---------------------------------------------------------"
            )
        }
        connectionEnd();
    });
};

function lowStock() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("----------------------------LOW STOCK PLEASE ORDER: ----------------------------------------");
        for (var i = 0; i < data.length; i++) {
            var dataStock = data[i].stock_quantity
            if (dataStock < 5) {
                console.log("ID: " + data[i].id + " || Department Name: " + data[i].department_name + " || Item: " + data[i].product_name + " || Price: $" + data[i].price + " || Total Inventory: " + data[i].stock_quantity + " units" + "\n" + "---------------------------------------------------------"
                );
            };
        };
    })
};

// function addItem() {
//     inquirer
//         .prompt([{

//             name: "ID",
//             type: "input",
//             message: "Please enter item ID"
//         },
//         {
//             name: "depo",
//             type: "input",
//             messeage: "Please enter department"
//         },
//         {
//             name: "name",
//             type: "input",
//             message: "Please enter item name"
//         },
//         {
//             name:"price",
//             type: "input",
//             message: "Enter price ($$$)"
//         },
//         {
//             name: "stock",
//             type: "input",
//             message: "Please enter stock quantity"
//         }
//         ])
//         .then(function(input) {
//             connection.query("INSERT INTO products (id, product_name, department_name, price, stock_quantity)"
//             values(10, "CORSAIR Vengence 8gb DDR4", "Memory", 60, 33);
//         })
   
// }

function connectionEnd() {
    connection.end()
};
