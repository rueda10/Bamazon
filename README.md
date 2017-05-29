# Bamazon

Bamazon is an Amazon-like storefront, CLI application, with interfaces for customers, managers and supervisors.

## Customers

`node bamazonCustomer.js`

Customers will first see all of the items available for sale. Customers will then be prompted for the ID of the product they would like to buy, as well as the number of units to be purchased.

![Customer-01](/images/Customer-01.png)

If there are not enough units of the selected product in stock, the app will display a message letting the customer know and the transaction will not take place.

![Customer-01](/images/Customer-02.png)

If the store does have enough units, the custome's order will be fulfilled, and the total cost will be displayed.

![Customer-01](/images/Customer-03.png)
