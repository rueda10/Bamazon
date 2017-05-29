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
      "View Product Sales by Department",
      "Create New Department",
      "Exit"
    ]
  }).then(function(answer) {
    switch (answer.action) {
      case "View Product Sales by Department":
        displayProductSalesByDepartment();
        break;

      case "Create New Department":
        createNewDepartment();
        break;

      case "Exit":
        break;
    }
  });
}

function displayProductSalesByDepartment() {
  var query = "SELECT department_id, department_name, over_head_costs, total_sales, total_sales - over_head_costs AS total_profit FROM departments";
  connection.query(query, function(err, res) {
    printTable(res);
    displayOptions();
  });
}

function createNewDepartment() {
  console.log("");
  console.log("Add new department:");
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Department Name:"
    },
    {
      type: "input",
      name: "over_head_costs",
      message: "Overhead Costs:"
    }
  ]).then(function(answers) {
    var query = "INSERT INTO departments SET ?";
    connection.query(query, {
      department_name: answers.department_name,
      over_head_costs: answers.over_head_costs
    }, function(err, res) {
      console.log("");
      console.log("Department '" + answers.department_name + "' Added.");
      console.log("");
      displayOptions();
    });
  });

}

function printTable(res) {
  console.log("");

  console.table(res);
}
