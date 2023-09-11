const express = require('express');
const router = express.Router();
const User = require("../models/User");

/**
 * get all customers
 */
router.get("/", async (req, res) => {
    try {
        console.log('entered the endpoint');
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.send("Error" + err);
    }
});

/**
 * get a one customer using NIC
 */
router.get("/:nic", async (req, res) => {
    try {
        const user = await User.findOne({ Nic: req.params.nic });
        if (user === null) {
            res.json({ message: `There is not a user in this ${req.params.nic}` })
        } else {
            res.json(user);
        }
    } catch (err) {
        res.send("Error" + err);
    }
});

/**
 * check one customer is present or not using NIC
 */
router.get("/present/:nic", async (req, res) => {
    try {
        const user = await User.findOne({ Nic: req.params.nic });
        if (user === null) {
            res.json({ isPresent: false });
        } else {
            res.json({ isPresent: true });
        }
    } catch (err) {
        res.send("Error" + err);
    }
});

/**
 * create a new customer
 */
router.post("/", async (req, res) => {
    const info = new User({
        Name: req.body.Name,
        Address: req.body.Address,
        Nic: req.body.Nic,
    });
    const nic = req.body.Nic;
    try {
        // check whether this nic is already saved
        const isPresent = await User.find({ Nic: nic });
        if (isPresent === null) {
            const c1 = await info.save();
            res.json(c1);
        } else {
            res.json({ message: `There is a user already in this ${nic} NIC` });
        }
    } catch (err) {
        res.send("Error");
    }
});

/**
 * delete a user using NIC as query parameter
 */
router.delete("/", async (req, res) => {
    const deleteNic = req.query.nic;

    try {
        const result = await User.deleteMany({ Nic: deleteNic });
        if (result.deletedCount > 0) {
            res.send(`Deleted customer with NIC: ${deleteNic}`);
        } else {
            res.send(`Customer with NIC ${deleteNic} not found.`);
        }
    } catch (error) {
        res.send("Error");
    }
});

/**
 * update the details of a user
 */
router.put("/:Nic", async (req, res) => {
    const nicToUpdate = req.params.Nic;
    const newName = req.body.Name;
    const address = req.body.Address;

    try {
        const updatedCustomer = await User.findOneAndUpdate(
            { Nic: nicToUpdate },
            { $set: { Name: newName, Address: address } },
            { new: true }
        );

        if (updatedCustomer) {
            res.json(updatedCustomer);
        } else {
            res.send(`Customer with NIC ${nicToUpdate} not found.`);
        }
    } catch (error) {
        res.send("Error");
    }
});

module.exports = router;