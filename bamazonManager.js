var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  displayOptions();
});

function displayOptions() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product",
      "Exit"
    ]
  }).then(function(answer) {
    switch (answer.action) {
      case "View Products for Sale":
        displayProducts();
        break;

      case "View Low Inventory":
        displayLowInventory();
        break;

      case "Add to Inventory":
        addToInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;

      case "Exit":
        break;
    }
  });
}

function displayProducts() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    printTable(res);
    displayOptions();
  });
}

function displayLowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity <= 5";

  connection.query(query, function(err, res) {
    if (res.length > 0) {
      printTable(res);
    } else {
      console.log("");
      console.log("No products with 5 or less units in stock.");
      console.log("");
    }

    displayOptions();
  });
}

function addToInventory() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    printTable(res);
    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Enter ID of product to add:"
      },
      {
        type: "input",
        name: "units",
        message: "How many units would you like to add?"
      }
    ]).then(function(answers) {
      const itemID = answers.item_id;
      const unitsToAdd = answers.units;

      var query = "SELECT * FROM products WHERE item_id='" + itemID + "'";
      connection.query(query, function(err, res) {
        const units = res[0].stock_quantity;
        const newUnits = parseInt(units) + parseInt(unitsToAdd);

        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, [{
          stock_quantity: newUnits
        }, {
          item_id: itemID
        }], function(err, res) {
          displayOptions();
        });
      });
    });
  });
}

function addNewProduct() {
  console.log("");
  console.log("Add new product:");
  inquirer.prompt([
    {
      type: "input",
      name: "product_name",
      message: "Product Name:"
    },
    {
      type: "input",
      name: "department_name",
      message: "Department Name:"
    },
    {
      type: "input",
      name: "units",
      message: "Units:"
    },
    {
      type: "input",
      name: "price",
      message: "Price:"
    }
  ]).then(function(answers) {
    const productName = answers.product_name;
    const departmentName = answers.department_name;
    const price = answers.price;
    const units = answers.units;

    var query = "INSERT INTO products SET ?";
    connection.query(query, {
      product_name: productName,
      department_name: departmentName,
      price: price,
      stock_quantity: units
    }, function(err, res) {
      console.log("");
      console.log("Product '" + productName + "' Added.");
      console.log("");
      displayOptions();
    });
  });
}

function printTable(res) {
  console.log("");

  var entries = [];
  for (var i = 0; i < res.length; i++) {
    entries.push({
      ID: res[i].item_id,
      PRODUCT_NAME: res[i].product_name,
      UNITS: res[i].stock_quantity,
      'PRICE($)': res[i].price
    });
  }

  console.table(entries);
}
