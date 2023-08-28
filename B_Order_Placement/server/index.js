const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const db = require("./models");

app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});

const orderRouter = require("./routes/orders");
app.use("/orders", orderRouter);
