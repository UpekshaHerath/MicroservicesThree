const express = require('express');
const app = express();
const product = require('./src/routes/product');
const port = process.env.PORT || 3000;

// middle wear
app.use(express.json());

// routes
app.use('/products', product);

// listening on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
