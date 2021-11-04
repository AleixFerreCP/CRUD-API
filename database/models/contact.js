const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.PG_USER}:${process.env.PG_PWD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);

const Contacts = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING(50) },
    phone: { type: DataTypes.STRING(11) },
    secphone: { type: DataTypes.STRING(11) },
    email: { type: DataTypes.STRING(50) },
    notes: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
  }
);

Contacts.getAll = async () => {
  try {
    const contacts = await Contacts.findAll();
    return contacts;
  } catch (error) {
    return error;
  }
};

Contacts.get = async (id) => {
  try {
    const contacts = await Contacts.findOne({ where: { id: id } });
    return contacts;
  } catch (error) {
    return error;
  }
};

Contacts.new = async (contact) => {
  try {
    const contacts = await Contacts.create(contact);
    return contacts;
  } catch (error) {
    return error;
  }
};

Contacts.edit = async (contact, id) => {
  try {
    const contacts = await Contacts.update(contact, { where: { id: id } });
    return contacts;
  } catch (error) {
    return error;
  }
};

Contacts.delete = async (id) => {
  try {
    const contacts = await Contacts.destroy({ where: { id: id } });
    return contacts;
  } catch (error) {
    return error;
  }
};

module.exports = Contacts;
