const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function insertMessage(text, username) {
    await pool.query(
        "INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)",
        [text, username, new Date()] 
    )
}

module.exports = { getAllMessages, insertMessage };