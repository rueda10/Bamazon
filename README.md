# Bamazon

Bamazon is an Amazon-like storefront, CLI application, with interfaces for customers, managers and supervisors.

## Customers

`node bamazonCustomer.js`

Customers will first see all of the items available for sale. Customers will then be prompted for the ID of the product they would like to buy, as well as the number of units to be purchased.

![Customer-01](/images/Customer-01.png)

If there are not enough units of the selected product in stock, the app will display a message letting the customer know and the transaction will not take place.

![Customer-02](/images/Customer-02.png)

If the store does have enough units, the custome's order will be fulfilled, and the total cost will be displayed.

![Customer-03](/images/Customer-03.png)

## Managers

`node bamazonManager.js`

The manager's interface will have the option to view the products that are for sale, view the products that are low on inventory, add more units of a product to the store, and add a new product to the store.

![Manager-01](/images/Manager-01.png)

### View Products For Sale

This option will display a table with the products that are for sale including the number of units available and the price for each.

![Manager-02](/images/Manager-02.png)

### View Low Inventory

This option will display all items with a inventory count lower than five.

![Manager-03](/images/Manager-03.png)

### Add to Inventory

This option will allow the manager to add more units to a product.

![Manager-04](/images/Manager-04.png)

### Add New Product

This option will allow the manager to add a new product to the store.

![Manager-05](/images/Manager-05.png)

## Supervisors

`node bamazonSupervisor.js`

The supervisor's interface will have the option to view product sales by department, and create a new department.

![Supervisor-01](/images/Supervisor-01.png)

### View Product Sales by Department

This option will display a table with the total sales and profit for each department.

![Supervisor-02](/images/Supervisor-02.png)

### Create New Department

This option will allow the supervisor to add a new department to the store.

![Supervisor-03](/images/Supervisor-03.png)
