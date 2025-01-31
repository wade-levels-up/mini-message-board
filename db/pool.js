require('dotenv').config();
const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: ${{ mini_msg_board.DATABASE_URL }}
})
