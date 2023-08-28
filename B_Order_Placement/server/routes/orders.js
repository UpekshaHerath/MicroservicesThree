const express = require("express");
const router = express.Router();
const { Orders } = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const listOfOrders = await Orders.findAll({
      attributes: ["order_id", "weight", "price", "order_status"],
    });
    console.log(listOfOrders);
    res.json(listOfOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retireve orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { weight, price, order_status } = req.body;

    const newOrder = await Orders.create({
      weight,
      price,
      order_status,
    });

    res.status(201).json(newOrder);
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
