const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Orders } = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const listOfOrders = await Orders.findAll({
      attributes: ["order_id", "weight", "price","item_count", "order_status", "user_id", "product_id"],
    });
    res.status(201).json(listOfOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { weight, item_count, order_status, user_id, product_id } = req.body;

    // find whether this user is available
    const userResponse = await axios.get(`http://localhost:3000/user/present/${user_id}`);

    // find whether this product is available
    const itemResponse = await axios.get(`http://localhost:4000/products/isPresent/${product_id}`);

    const countCheckingData = {
      "product_id": product_id,
      "order_product_count": item_count
    }

    // calculate order price
    const orderPriceResponse = await axios.post(`http://localhost:4000/products/orderPrice`, countCheckingData);
    const price = orderPriceResponse.data.orderPrice;

    // find whether the count of products is already present
    const productCountResponse = await axios.post(`http://localhost:4000/products/checkProductAmount`, countCheckingData);
    const isProductCountEnough = productCountResponse.data.isProductCountEnough;

    // const productResponse
    if (userResponse.data.isPresent) {
      if (itemResponse.data.isPresent) {
        if (isProductCountEnough) {
          // reduce the item count from the inventory
          const productCountUpdateResponse = await axios.patch(`http://localhost:4000/products/itemCount`, countCheckingData);
          if (productCountUpdateResponse.data.isUpdated) {
            // place the order
            const newOrder = await Orders.create({
              weight,
              price,
              item_count,
              order_status,
              user_id,
              product_id
            });
            res.status(201).json(newOrder);
          } else {
            res.status(500).json({ message: "Error while updating the product count" });
          }
        } else {
          res.json({ message: `Product count is not enough in ${product_id}`});
        }
      } else {
        res.json({ message: `There is not a product relevant to ${product_id}` });
      }
    } else {
      res.json({ message: `There is not a user relevant to ${user_id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { weight, price, order_status, order_id } = req.body;

    await Orders.update(
      {
        weight,
        price,
        order_status,
      },
      { where: { order_id: order_id } }
    );

    res.status(201).json("Order Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update Order" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { order_id } = req.body;

    const order = await Orders.findOne({ where: { order_id } });

    await Orders.destroy({ where: { order_id: order_id } });

    res.json({ message: "Room removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove room" });
  }
});

module.exports = router;
