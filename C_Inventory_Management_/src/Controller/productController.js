const pool = require('../configuration/db.config');

/**
 * Create a new item in the inventory
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createItem = async (req, res) => {
    try {
        const { product_name, product_price, product_count } = req.body;
        const newNote = await pool.query(`INSERT INTO inventory (product_name, product_price, product_count) VALUES ('${product_name}', ${product_price}, ${product_count})`);
        res.json({ message: 'Product inserted successfully' });
    } catch (err) {
        console.error(err.message);
        res.json({ message: 'Error while inserting the product' });
    }
}

/**
 * To take all the items from the inventory
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getAllItems = async(req,res) => {
    try {
        const allNotes = await pool.query("SELECT * FROM inventory");
        res.json(allNotes.rows);
    } catch (err) {
        console.error(err.message);
        res.json({ message: false });
    }
}

/**
 * Get One product from the inventory
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.getOneItem = async(req,res) => {
    try {
        const { id } = req.params;
        const oneNote =  await pool.query(`SELECT * FROM inventory WHERE product_id = ${id}`);
        res.json(oneNote.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.json({ message: false });
    }
}

/**
 * Update a product
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateOneItem = async(req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_price, product_count } = req.body;
        const updatedNote = await pool.query("UPDATE inventory SET product_name = $1, product_price = $2, product_count = $3 WHERE product_id= $4", [product_name, product_price, product_count, id])
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.json({ message: 'Error while updating product' });
    }
};

/**
 * Delete a product
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteOneItem = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query("DELETE FROM inventory WHERE product_id = $1", [id]);
        res.json({ message : "Product has been deleted" });
    } catch (err) {
        console.error(err.message);
        res.json({ message: 'Error while deleting product' });
    }
}

/**
 * Check whether a given user is present
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.checkProductPresent = async(req, res) => {
    try {
        const {id} = req.params;

        const checkProduct = await pool.query(`SELECT EXISTS (SELECT 1 FROM inventory WHERE product_id = ${id});`);
        const isPresent = checkProduct.rows[0].exists;

        if (isPresent) {
            res.json({ isPresent: true });
        } else {
            res.json({ isPresent: false });
        }
    } catch (err) {
        console.log(err.message);
        res.json({ message: 'Error while checking the user' });
    }
}

/**
 * Check the required amount of products is in the stocks
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.checkProductAmount = async(req, res) => {
    try {
        const { product_id, order_product_count } = req.body;

        // take the quantity of the product and check the product count is enough
        const amountCheck = await pool.query(`SELECT product_count from inventory where product_id = ${product_id}`);
        const productCount = amountCheck.rows[0].product_count;

        if (productCount >= order_product_count) {
            res.json({ isProductCountEnough: true });
        } else {
            res.json({ isProductCountEnough: false });
        }
    } catch (err) {
        console.log(err.message);
        res.json({ message: 'Error while checking the product amount' });
    }
}

/**
 * Update the item Count
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateItemCount = async (req, res) => {
    try {
        const { product_id, order_product_count } = req.body;

        // take the quantity of the product and check the product count is enough
        const amountCheck = await pool.query(`SELECT product_count FROM inventory where product_id = ${product_id}`);
        const productCount = amountCheck.rows[0].product_count;

        // calculate the new product count
        const newProductCount = productCount - order_product_count;

        // update the new product count in the inventory
        const updateResponse = await pool.query(`UPDATE inventory SET product_count = ${newProductCount} WHERE product_id = ${product_id}`);

        res.json({ isUpdated: true });
    } catch (err) {
        console.log(err.message);
        res.json({ message: 'Error while updating the product amount', isUpdated: false });
    }
}

exports.calculatePriceOfOrder = async (req, res) => {
    try {
        const { product_id, order_product_count } = req.body;

        const productPrice = await pool.query(`SELECT product_price FROM inventory where product_id = ${product_id}`);
        const orderPrice = productPrice.rows[0].product_price * order_product_count;
        res.json({ orderPrice: orderPrice });
    } catch (err) {
        console.log(err.message);
        res.json({ message: 'Error while calculating the product price', isUpdated: false });
    }
}