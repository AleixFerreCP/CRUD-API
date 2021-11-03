"use strict";

require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("The app is working as expected!");
});

const contactsRoute = require("./routes/contacts");
app.use("/contacts", contactsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
