const express = require('express');
const router = express.Router();

// get customers
router.get("/user", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.send("Error" + err);
    }
});

// create a new customer
router.post("/user", async (req, res) => {
    const info = new User({
        Name: req.body.Name,
        Address: req.body.Address,
        Nic: req.body.Nic,
    });
    try {
        const c1 = await info.save();
        res.json(c1);
    } catch (err) {
        res.send("Error");
    }
});

// delete a user
router.delete("/user", async (req, res) => {
    const deleteNic = req.query.Nic;

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

// update the detailes of a user
router.put("/user/:Nic", async (req, res) => {
    const nicToUpdate = req.params.Nic;
    const newName = req.body.Name;

    try {
        const updatedCustomer = await User.findOneAndUpdate(
            { Nic: nicToUpdate },
            { $set: { Name: newName } },
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