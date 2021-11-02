const { Client } = require("pg");

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PG_DATABASE,
});
client.connect();

client
  .query("SELECT * FROM contacts")
  .then((data) => {
    console.log("DATA:", data.rows);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });

module.exports = {};
