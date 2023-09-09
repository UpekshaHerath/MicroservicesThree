const pool = require('../configuration/db.config');

/**
 * Create a new item in the inventory
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createNote = async (req, res) => {
    try {
        const { product_name, product_price, product_count } = req.body;
        const newNote = await pool.query(`INSERT INTO inventory ( product_name, product_price, product_count) VALUES ('${product_name}', ${product_price}, ${product_count})`);
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
exports.getAllNotes = async(req,res) => {
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
exports.getOneNote = async(req,res) => {
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
exports.updateOneNote = async(req, res) => {
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
exports.deleteOneNote = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query("DELETE FROM inventory WHERE product_id = $1", [id]);
        res.json({ message : "Product has been deleted" });
    } catch (err) {
        console.error(err.message);
        res.json({ message: 'Error while deleting product' });
    }
}
