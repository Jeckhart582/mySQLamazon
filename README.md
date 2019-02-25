# mySQLamazon
mySQL and node.js amazon-like app

Goal: Mock storefront conducted through node.js using inquirer and mySQL database

User is greeted with full stock and asked for input on which item to purchase "<i>Storefront</i>":
![Initial Load](/images/homebig.png)

After user enters an item ID, they are shown the selected item and asked how many they would like to purchase, if there is not enough stock quantity, the user is notified and asked if they would like to purchase another item
![Item Selector](/images/notenough.png)

If there is enough stock on hand, the stock quantity is updated. The user is given a total dollar amount and asked if they would like to purchase more items
![Purchase Item](/images/purchase.png)


-------------------------------------------MANAGER SELECTOR--------------------------------------------------------------

Goal: To allow a user to view and update data from a mySQL database
![List View](/images/list.png)

"Manager" is greeted with a list of options. The first instance is a display of the total inventory of all items
![Manager View](/images/manager.png)

Second option allows manager to view which products have a stock quantity less than five
![Low Stock](/images/lowstock.png)