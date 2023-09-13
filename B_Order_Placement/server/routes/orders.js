const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Orders } = require("../models");
const { Op, Sequelize } = require("sequelize");

const baseURL_user = "http://localhost:3000/user";
const baseURL_product = "http://localhost:4000/products";

/**
 * Get all orders
 */
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

router.get("/:id", async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        order_id: req.params.id
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
})

/**
 * Create a new orders
 */
router.post("/", async (req, res) => {
  try {
    const { weight, item_count, order_status, user_id, product_id } = req.body;

    // find whether this user is available
    const userResponse = await axios.get(`${baseURL_user}/present/${user_id}`);

    // find whether this product is available
    const itemResponse = await axios.get(`${baseURL_product}/isPresent/${product_id}`);

    const countCheckingData = {
      "product_id": product_id,
      "order_product_count": item_count
    }

    // calculate order price
    const orderPriceResponse = await axios.post(`${baseURL_product}/orderPrice`, countCheckingData);
    const price = orderPriceResponse.data.orderPrice;

    // find whether the count of products is already present
    const productCountResponse = await axios.post(`${baseURL_product}/checkProductAmount`, countCheckingData);
    const isProductCountEnough = productCountResponse.data.isProductCountEnough;

    // const productResponse
    if (userResponse.data.isPresent) {
      if (itemResponse.data.isPresent) {
        if (isProductCountEnough) {
          // reduce the item count from the inventory
          const productCountUpdateResponse = await axios.patch(`${baseURL_product}/itemCount`, countCheckingData);
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
          res.status(500).json({ message: `Product count is not enough in ${product_id}`});
        }
      } else {
        res.status(500).json({ message: `There is not a product relevant to ${product_id}` });
      }
    } else {
      res.status(500).json({ message: `There is not a user relevant to ${user_id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 * update an orders
 */
router.put("/", async (req, res) => {
  try {
    const { order_id, weight, item_count, order_status, user_id, product_id } = req.body;

    // find whether this user is available
    const userResponse = await axios.get(`${baseURL_user}/present/${user_id}`);

    // find whether this product is available
    const itemResponse = await axios.get(`${baseURL_product}/isPresent/${product_id}`);

    // get this order to update the product count
    const order = await Orders.findOne({
      where: {
        order_id: order_id
      },
    });

    // get this order to update the product count
    const productBeforeChanging = await axios.get(`${baseURL_product}/${product_id}`);
    if (order.dataValues.item_count == product_id) {
      // add the productCount in the previous order
      const previousProductCount = order.dataValues.item_count;
      const currentProductCount = productBeforeChanging.data.product_count;
      const newCorrectProductCount = previousProductCount + currentProductCount;
      // update the product count
      const canselTheOrder = await axios.patch(`${baseURL_product}/${product_id}`, {
        "product_count": newCorrectProductCount
      })
    }

    const countCheckingData = {
      "product_id": product_id,
      "order_product_count": item_count
    }

    // calculate order price
    const orderPriceResponse = await axios.post(`${baseURL_product}/orderPrice`, countCheckingData);
    const price = orderPriceResponse.data.orderPrice;

    // find whether the count of products is already present
    const productCountResponse = await axios.post(`${baseURL_product}/checkProductAmount`, countCheckingData);
    const isProductCountEnough = productCountResponse.data.isProductCountEnough;

    // const productResponse
    if (userResponse.data.isPresent) {
      if (itemResponse.data.isPresent) {
        if (isProductCountEnough) {
          // reduce the item count from the inventory
          const productCountUpdateResponse = await axios.patch(`${baseURL_product}/itemCount`, countCheckingData);
          if (productCountUpdateResponse.data.isUpdated) {
            // place the order
            const updateOrder = await Orders.update(
                {
                  weight,
                  item_count,
                  order_status,
                  user_id,
                  product_id
                },
                { where: { order_id: order_id } }
            );
            res.status(201).json({message: "Order updated successfully"});
          } else {
            res.status(500).json({ message: "Error while updating the product count" });
          }
        } else {
          res.status(500).json({ message: `Product count is not enough in ${product_id}`});
        }
      } else {
        res.status(500).json({ message: `There is not a product relevant to ${product_id}` });
      }
    } else {
      res.status(500).json({ message: `There is not a user relevant to ${user_id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

/**
 * Cancel an order
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // get this order to update the product count
    const order = await Orders.findOne({
      where: {
        order_id: id
      },
    });
    const productBeforeChanging = await axios.get(`${baseURL_product}/${order.dataValues.product_id}`);

    // add the productCount in the previous order
    const previousProductCount = order.dataValues.item_count;
    const currentProductCount = productBeforeChanging.data.product_count;
    const newCorrectProductCount = previousProductCount + currentProductCount;

    // update the product count
    const canselTheOrder = await axios.patch(`${baseURL_product}/${order.dataValues.product_id}`, {
      "product_count": newCorrectProductCount
    })

    const marks = await Orders.destroy({ where: { order_id: id } });

    res.json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

module.exports = router;
