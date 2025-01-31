#! /usr/bin/env node

require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT,
  username VARCHAR(255),
  added TIMESTAMPTZ
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hello world!', 'Wade', NOW()),
  ('Greetings Odinites', 'Odin', NOW())
`;

async function main() {
  console.log("seeding...");

  const env = process.argv[2];
  let connectionString;

    if (env === 'local') {
        connectionString = process.env.CONNECTION_STRING
    } else if ( env === 'production') {
        connectionString = process.env.PUBLIC_PROD_CONNECTION_STRING
    } else {
        throw new Error(`Enter 'npm run seed local' OR 'npm run seed production`);
    }

  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main().catch(err => console.error(err));