"use strict";

const { Router } = require("express");
const { getAllContacts, getContact, createContact, editContact, deleteContact } = require("../database");

const router = Router();

router.get("", async (req, res) => {
  console.log("Getting all contacts...");
  res.status(200).json(await getAllContacts());
});

router.get("/:id", async (req, res) => {
  console.log("Getting contact with id " + req.params.id);
  res.status(200).json(await getContact(req.params.id));
});

router.post("", async (req, res) => {
  console.log("Creating contact with info:", req.body);
  await createContact(req.body);
  res.status(201).json({});
});

router.put("/:id", async (req, res) => {
  console.log(`Editing contact (${req.params.id}) with info:`, req.body);
  const count = await editContact(req.body, req.params.id);
  if (count === 0) {
    res.status(404).json({
      message: "Contact not found",
    });
  } else {
    res.status(200).json({});
  }
});

router.delete("/:id", async (req, res) => {
  console.log(`Deleting contact (${req.params.id})`);
  const count = await deleteContact(req.params.id);
  if (count === 0) {
    res.status(404).json({
      message: "Contact not found",
    });
  } else {
    res.status(200).json({});
  }
});

module.exports = router;
