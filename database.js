const { Client } = require("pg");

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PG_DATABASE,
});
client.connect();

module.exports = {
  getAllContacts: async () => {
    return (await client.query("SELECT * FROM contacts")).rows;
  },

  createContact: async (contact) => {
    const values = getStringFromData(contact);

    await client.query(
      `INSERT INTO contacts(
      name, phone, notes, secphone, email)
      VALUES (${values});`
    );
  },

  editContact: async (contact, id) => {
    const values = Object.values(contact);
    const keys = Object.keys(contact);
    let setValues = `${keys[0]}='${values[0]}'`;

    for (let i = 1; i < keys.length; i++) {
      setValues += `,${keys[i]}='${values[i]}'`;
    }

    return (
      await client.query(
        `UPDATE contacts
       SET ${setValues}
       WHERE id='${id}'`
      )
    ).rowCount;
  },

  deleteContact: async (id) => {
    return (await client.query(`DELETE FROM contacts WHERE id='${id}'`)).rowCount;
  },
};

// PRIVATE UTILITARY FUNCTIONS

const getStringFromData = (data) =>
  Object.values(data)
    .map((v) => `'${v}'`)
    .join(", ");
