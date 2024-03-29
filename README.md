# MicroservicesThree
This project has been created based on <b><I>microservices architecture</I></b> with many different technologies. 
In this application, there are three microservices as follows: 
1. A_User_Management => MongoDB
2. B_Order_Placement => MySQL
3. C_Inventory_Management_ => PostgreSQL
4. C_Inventory_Management => Firebase
5. API Gateway
   
The A_User_Management microservice and C_Inventory_Management_ microservice are not responsible for requesting or retrieving data related to other microservices. Specifically, the A_User_Management microservice utilizes data exclusively from the User database, while the C_Inventory_Management_ microservice utilizes data from the InventoryManagement database. 

The B_Order_Placement microservice, on the other hand, relies on data from both the user database and the inventory management database. Within the B_Order_Placement microservice, multiple API endpoints are present.  

During the order placement process, a series of checks are conducted before an order is finalized. These checks include verifying the validity of the user through the A_User_Management microservice and ensuring the product's validity through the C_Inventory_Management_ microservice. Once the user has input the desired quantity of products, this information is relayed to the C_Inventory_Management_ microservice for price calculation. Subsequently, the total price is returned to the B_Order_Placement microservice.  

Following this, another request is dispatched to the C_Inventory_Management_ microservice to confirm the availability of the requested product quantity. Once it is confirmed that a sufficient product count is available, the order record is created. Simultaneously, the InventoryManagement database records a reduction in the number of products corresponding to the items purchased. 

When an order requires updating, the same method for checking user and product validity is employed as in the order placement process. Subsequently, the product count, which was previously reduced, is restored in the InventoryManagement database. Following the restoration, price calculation, and product quantity deduction are executed using the same method employed during the initial order placement. 

In the event of order cancellation, the order record is deleted, and the number of products in the InventoryManagement database is reduced through an API call to the C_Inventory_Management_ microservice.

## User Management Microservice
### Overview 
The User Management microservice is responsible for managing user data, including user profiles, authentication, and user-related operations. It provides RESTful API endpoints for creating, retrieving, updating, and deleting user information. 
### Technologies Used 
Node.js with Express.js - The server-side runtime environment and web application framework. 
MongoDB - Document-oriented NoSQL database that allows for the storage of data in JSON-like BSON (Binary JSON) format. 
### Implementation Details 
Setting Up the Environment 
The User Management microservice is built using Node.js and Express.js. It also uses MongoDB as its database.  
Following are the steps to set up the environment. 
Install Node.js and NPM.  
Could you create a MongoDB database in MongoDB Atlas and get the connection URL.  
Create a .env file in the project root directory to store environment variables like the MongoDB connection URL and the port number. 

## Order Placement Microservice
### Overview 
The Order Placement microservice is responsible for managing order data, including order handling, and order-related operations. It provides RESTful API endpoints for creating, reading, updating, and deleting order information. 
### Technologies Used 
Node.js with Express.js - The server-side runtime environment and web application framework. 
MsSql – A relational database used to store order data. 
### Implementation Details 
Setting Up the Environment 
The Order Management microservice is built using Node.js and Express.js. It also uses MySql as its database.  
Following are the steps to set up the environment. 
Install Node.js and NPM.  
Create a MySQL database. 

## Inventory Management Microservice
### Overview 
The Inventory Management microservice is responsible for managing inventory data and inventory -related operations. It provides RESTful API endpoints for creating, retrieving, updating, and deleting inventory information. 
### Technologies Used 
Node.js with Express.js - The server-side runtime environment and web application framework. 
PostgreSQL - Powerful, open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. 
### Setting Up the Environment 
The Inventory Management microservice is built using Node.js and Express.js. It also uses PostgreSQL as its database.  
Following are the steps to set up the environment. 
Install Node.js and NPM.  
Create a PostgreSQL database and obtain the connection URL.  
Create an .env file in the project root directory to store the environment variable, and the port number. 
