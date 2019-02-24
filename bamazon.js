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
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log("ID: " + data[i].id + " || Department Name: " + data[i].department_name + " || Item: " + data[i].product_name + " || Price: $" + data[i].price + " || Total Inventory: " + data[i].stock_quantity + " units" + "\n" + "---------------------------------------------------------"
            )
        }
        inquirerLoad();
    });
};

function inquirerLoad() {
    inquirer
        .prompt({
            name: "ID",
            type: "input",
            message: "Enter the ID of which item you'd like to purchase",
        })
        .then(function (idSelectionAnswers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { id: idSelectionAnswers.ID },
                function (err, data) {

                    console.log("You've selected id: " + idSelectionAnswers.ID + " (" + data[0].product_name + ")")

                    inquirer
                        .prompt({
                            name: "units",
                            type: "input",
                            message: "How many units would you like to purchase?"
                        })

                        .then(function (unitAmountAnswers) {
                            query1 = "UPDATE products SET ? WHERE ?"
                            var units = unitAmountAnswers.units
                            console.log("This item has " + data[0].stock_quantity + " units available")
                            if (data[0].stock_quantity < units) {
                                console.log("Sorry, we don't have enough of that item")
                                rollBack();
                            }
                            else {
                                var math = parseInt(data[0].stock_quantity) - parseInt(units)
                                var cost = parseInt(data[0].price) * parseInt(units)
                                connection.query(query1,
                                    [
                                        {
                                            stock_quantity: math
                                        },

                                        {
                                            id: idSelectionAnswers.ID
                                        }]
                                )
                                console.log("This transaction cost you $" + cost + "!")
                                rollBack();
                            }


                        });
                });
        });
};

function rollBack() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "purchaseMore",
            message: "Would you like to purchase more?",
            default: true
        }
    ]).then(function(user) {
        if (user.purchaseMore) {
            afterConnection();
        }
        else {
            connectionEnd();
        }
    })
}

function connectionEnd() {
    connection.end()
};
