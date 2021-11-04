const { Sequelize } = require("sequelize");

const url = `postgres://${process.env.PG_USER}:${process.env.PG_PWD}@${process.env.PG_HOST}:5432/${process.env.PG_DATABASE}`;

let database = new Sequelize(url);

module.exports = database;
