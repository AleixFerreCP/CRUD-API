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
    return (await client.query("SELECT * FROM contacts ORDER BY id")).rows;
  },

  getContact: async (id) => {
    return (await client.query("SELECT * FROM contacts WHERE id=" + id))?.rows[0];
  },

  createContact: async (contact) => {
    const values = getCreateValuesFromContact(contact);

    const QUERY = `INSERT INTO contacts(name, phone, secphone, email, notes) VALUES (${values}) RETURNING id`;

    console.log("QUERY: ", QUERY);

    return (await client.query(QUERY)).rows[0];
  },

  editContact: async (contact, id) => {
    let setValues = getUpdateValuesFromContact(contact);

    const QUERY = `UPDATE contacts SET ${setValues} WHERE id='${id}'`;

    console.log("QUERY: ", QUERY);

    return (await client.query(QUERY)).rowCount;
  },

  deleteContact: async (id) => {
    return (await client.query(`DELETE FROM contacts WHERE id='${id}'`)).rowCount;
  },
};

// PRIVATE UTILITARY FUNCTIONS

const getCreateValuesFromContact = (data) =>
  Object.values(data)
    .map((v) => {
      if (!v) return "NULL";
      else return `'${v.replace("'", "''")}'`;
    })
    .join(", ");

function getUpdateValuesFromContact(contact) {
  const values = Object.values(contact);
  const keys = Object.keys(contact);
  let setValues = `${keys[0]}=${getVal(values[0])}`;

  for (let i = 1; i < keys.length; i++) {
    setValues += `,${keys[i]}=${getVal(values[i])}`;
  }
  return setValues;
}

function getVal(v) {
  if (!v) {
    return "NULL";
  } else {
    return `'${v.replace("'", "''")}'`;
  }
}
