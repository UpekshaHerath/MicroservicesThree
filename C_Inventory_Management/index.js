const express = require("express");
const cors = require("cors");
const firebase = require("firebase");
const firebaseConfig = require("./config");

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

// firebase configurations
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // created the firestore
module.exports = db;

const port = process.env.PORT || 3000;

// routes
const product = require('./routers/ProductRouter');
app.use('/product', product); // map the product router to the products

app.listen(port, () => console.log(`Running on port ${port}`));
