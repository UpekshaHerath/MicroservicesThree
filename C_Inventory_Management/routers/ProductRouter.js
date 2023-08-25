const express = require("express");
const db = require('../index');

const router = express.Router();
const Product = db.collection("Products");

/**
 * Get all the products from the product collection
 */
router.get("/list", async (req, res) => {
    try {
        const snapshot = await Product.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.table(list); // just list down the results in the console as a table
        res.status(200).send(list);
    } catch (e) {
        res.status(400).send({msg: "Unexpected internal server error"});
    }
});

/**
 * Create a product according to a specific model. I the product is not in that model it will not insert that data to the database.
 */
router.post("/create", async (req, res) => {
    // create the template according to the given data
    try {
        const { name, description, quantity, price} = req.body;
        if (name === undefined || description === undefined || quantity === undefined || price === undefined) {
            res.status(400).send({ msg: "Data is unstructured. Can't complete the insert operation"})
        } else {
            const data = {
                name: name,
                description: description,
                quantity: quantity,
                price: price
            }
            await Product.add({ data });
            res.status(200).send({ msg: "User Added" });
        }
    } catch (e) {
        res.status(400).send({msg: "Unexpected internal server error"});
    }
});

/**
 * Update the data of a product depending on the id of that product
 */
router.put("/update", async (req, res) => {
    try {
        const id = req.body.id;
        delete req.body.id;
        const data = req.body;
        await Product.doc(id).set(data);
        res.send({ msg: "Updated" });
    } catch (e) {
        res.status(400).send({msg: "Unexpected internal server error"});
    }
});

/**
 * Delete a product depending on the id of that product
 */
router.delete("/delete", async (req, res) => {
    try {
        const id = req.body.id;
        await Product.doc(id).delete();
        res.send({ msg: "Deleted" });
    } catch (e) {
        res.status(400).send({msg: "Unexpected internal server error"});
    }
});

module.exports = router;