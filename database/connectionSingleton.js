const { Sequelize } = require("sequelize");

const url = `postgres://${process.env.PG_USER}:${process.env.PG_PWD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const database = new Sequelize(url);

module.exports = database;
