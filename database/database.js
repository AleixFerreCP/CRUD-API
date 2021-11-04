const database = require("./connectionSingleton");

authToDatabase(database);

const Contacts = require("./models/contact");

module.exports = {
  getAllContacts: async () => {
    return await Contacts.getAll();
  },

  getContact: async (id) => {
    return await Contacts.get(id);
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
    .map((v) => getVal(v))
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
  return !v ? "NULL" : `'${v.replace("'", "''")}'`;
}

async function authToDatabase(db) {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
