# MicroservicesThree
This is a project which has been created based on microservices architecture with many different technologies. 
In this application, there are three microservices as follows: 
1. A_User_Management 
2. B_Order_Placement 
3. C_Inventory_Management_ 

The A_User_Management microservice and C_Inventory_Management_ microservice are not responsible for requesting or retrieving data related to other microservices. Specifically, the A_User_Management microservice utilizes data exclusively from the User database, while the C_Inventory_Management_ microservice utilizes data from the InventoryManagement database. 

The B_Order_Placement microservice, on the other hand, relies on data from both the user database and the inventory management database. Within the B_Order_Placement microservice, multiple API endpoints are present.  

During the order placement process, a series of checks are conducted before an order is finalized. These checks include verifying the validity of the user through the A_User_Management microservice and ensuring the product's validity through the C_Inventory_Management_ microservice. Once the user has input the desired quantity of products, this information is relayed to the C_Inventory_Management_ microservice for price calculation. Subsequently, the total price is returned to the B_Order_Placement microservice.  

Following this, another request is dispatched to the C_Inventory_Management_ microservice to confirm the availability of the requested product quantity. Once it is confirmed that a sufficient product count is available, the order record is created. Simultaneously, the InventoryManagement database records a reduction in the number of products corresponding to the items purchased. 

When an order requires updating, the same method for checking user and product validity is employed as in the order placement process. Subsequently, the product count, which was previously reduced, is restored in the InventoryManagement database. Following the restoration, price calculation, and product quantity deduction are executed using the same method employed during the initial order placement. 

In the event of order cancellation, the order record is deleted, and the number of products in the InventoryManagement database is reduced through an API call to the C_Inventory_Management_ microservice.
