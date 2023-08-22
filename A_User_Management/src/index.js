const express = require('express')
const mongoose = require("mongoose");
require('dotenv').config();

const app = express()
const port = 3000

// mongoose.set("strictQuery", false);
// process.env.DATABASE_URL
mongoose.connect('mongodb+srv://upeksha:22058abcd@cluster0.14ytvct.mongodb.net/', { useNewUrlParser: true }).then(() => {
    console.log("connected with database");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})