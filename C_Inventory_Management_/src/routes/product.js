const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

router.patch("/itemCount", productController.updateItemCount);

router.post("/orderPrice", productController.calculatePriceOfOrder);

router.post("/", productController.createItem);

router.get("/", productController.getAllItems);

router.post("/checkProductAmount", productController.checkProductAmount);

router.get("/:id", productController.getOneItem); // pass the id as a parameter

router.put("/:id", productController.updateOneItem);

router.delete("/:id", productController.deleteOneItem);

router.patch("/:id", productController.updateOneItemPartially);

router.get("/isPresent/:id", productController.checkProductPresent);







module.exports = router;
