const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "204074Mabcd#",
    host : "localhost",
    port: 5432,
    database: "InventoryManagement"
})

module.exports = pool;