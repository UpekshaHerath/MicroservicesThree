const express = require('express');
const app = express();
const port = process.env.PORT || 6000;

// middle wear
app.use(express.json());

// routes



// listening on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
