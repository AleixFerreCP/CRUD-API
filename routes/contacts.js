"use strict";

const { Router } = require("express");
const { getAllContacts, createContact, editContact, deleteContact } = require("../database");

const router = Router();

router.get("", async (req, res) => {
  res.status(200).json(await getAllContacts());
});

router.post("", async (req, res) => {
  await createContact(req.body);
  res.sendStatus(201);
});

router.put("/:id", async (req, res) => {
  const count = await editContact(req.body, req.params.id);
  if (count === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200);
  }
});

router.delete("/:id", async (req, res) => {
  const count = await deleteContact(req.params.id);
  if (count === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
