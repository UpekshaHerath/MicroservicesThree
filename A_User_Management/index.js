const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// connect with the database
mongoose.connect("mongodb+srv://upeksha:22058abcd@cluster0.14ytvct.mongodb.net/", {
    useNewUrlParser: true,
  }).then(() => {
    console.log("connected with database");
  });


// routes
const userRouter = require('./src/routes/userRoute');
app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
