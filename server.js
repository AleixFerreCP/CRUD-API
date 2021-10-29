"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const db = require("./database");

const contactsRoute = require("./routes/contacts");

app.get("/", (req, res) => {
  res.send("The app is working as expected!");
});

app.use("/contacts", contactsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
