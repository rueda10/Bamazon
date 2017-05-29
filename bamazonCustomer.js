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

  displayItems();
});

function displayItems() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    printTable(res);
    promptUser();
  });
}

function promptUser() {
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "Enter ID of product you would like to buy:"
    },
    {
      type: "input",
      name: "units",
      message: "How many units would you like to buy?"
    }
  ]).then(function(answers) {
    const itemID = answers.item_id;
    const unitsPurchased = answers.units;

    var query = "SELECT * FROM products WHERE item_id='" + itemID + "'";
    connection.query(query, function(err, res) {
      const productSales = res[0].product_sales;
      const basePrice = res[0].price;
      const stockQuantity = res[0].stock_quantity;
      const productName = res[0].product_name;
      const departmentName = res[0].department_name;
      var totalPrice = basePrice * unitsPurchased;
      const itemsLeft = stockQuantity - unitsPurchased;
      const newProductSales = productSales + totalPrice;
      if (itemsLeft >= 0) {
        // enough items
        fulfillOrder(itemID, itemsLeft, unitsPurchased, newProductSales, productName, basePrice, totalPrice, departmentName);
      } else {
        // not enough items
        console.log("");
        console.log("Insufficient quantity of '" + productName + "'. Try again.");
        displayItems();
      }
    });
  });
}

function fulfillOrder(itemID, itemsLeft, unitsPurchased, newProductSales, productName, basePrice, totalPrice, departmentName) {
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{
    stock_quantity: itemsLeft,
    product_sales: newProductSales
  }, {
    item_id: itemID
  }], function(err, res) {
    console.log("");
    console.log("Purchase summary: ");
    console.log("\tProduct Name: " + productName);
    console.log("\tTotal Price: $" + basePrice + " x " + unitsPurchased + " = $" + totalPrice);
    console.log("");

    var query = "SELECT total_sales FROM departments WHERE department_name='" + departmentName + "'";
    connection.query(query, function(err, res) {
      const totalSales = res[0].total_sales;
      const newTotalSales = totalSales + newProductSales;

      var query = "UPDATE departments SET ? WHERE ?";
      connection.query(query, [{
        total_sales: newTotalSales
      }, {
        department_name: departmentName
      }], function(err, res) {
        inquirer.prompt([
          {
            type: "confirm",
            name: "keep_shopping",
            message: "Keep shopping?"
          }
        ]).then(function(answers) {
          if (answers.keep_shopping) {
            displayItems();
          }
        });
      });
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
      'PRICE($)': res[i].price
    });
  }

  console.table(entries);
}
