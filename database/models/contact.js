const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.PG_USER}:${process.env.PG_PWD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);

const Contacts = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 50,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        max: 11,
      },
    },
    secphone: {
      type: DataTypes.STRING,
      validate: {
        max: 11,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        max: 50,
      },
    },
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

module.exports = Contacts;
