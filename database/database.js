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
    return await Contacts.new(contact);
  },

  editContact: async (contact, id) => {
    return await Contacts.edit(contact, id);
  },

  deleteContact: async (id) => {
    return await Contacts.delete(id);
  },
};

async function authToDatabase(db) {
  let retries = 5;

  while (retries) {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
      break;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      retries--;
      console.log("Retries:", retries);
      await new Promise((res) => setTimeout(res, 1000)); // wait for 1s
    }
  }
}
