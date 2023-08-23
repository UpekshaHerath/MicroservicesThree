const express = require("express");
const cors = require("cors");
const Product = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", async (req, res) => {
    const snapshot = await Product.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});

app.post("/create", async (req, res) => {
    const data = req.body;
    await Product.add({ data });
    res.send({ msg: "User Added" });
});

app.post("/update", async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await Product.doc(id).update(data);
    res.send({ msg: "Updated" });
});

app.delete("/delete", async (req, res) => {
    const id = req.body.id;
    await Product.doc(id).delete();
    res.send({ msg: "Deleted" });
});

app.listen(port, () => console.log(`Running on port ${port}`));
