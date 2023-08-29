const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./Customer");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// mongoose.set("strictQuery", false);
// process.env.DATABASE_URL
mongoose
  .connect("mongodb+srv://upeksha:22058abcd@cluster0.14ytvct.mongodb.net/", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected with database");
  });

app.post("/customerdata", async (req, res) => {
  const info = new Customer({
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

app.get("/", async (req, res) => {
  try {
    const customer = await Customer.find();

    res.json(customer);
  } catch (err) {
    res.send("Error" + err);
  }
});

app.delete("/customerdata", async (req, res) => {
  const deleteNic = req.query.Nic;

  try {
    const result = await Customer.deleteMany({ Nic: deleteNic });
    if (result.deletedCount > 0) {
      res.send(`Deleted customer with NIC: ${deleteNic}`);
    } else {
      res.send(`Customer with NIC ${deleteNic} not found.`);
    }
  } catch (error) {
    res.send("Error");
  }
});

app.put("/customerdata/:Nic", async (req, res) => {
  const nicToUpdate = req.params.Nic;
  const newName = req.body.Name;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
