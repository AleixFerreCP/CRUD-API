"use strict";

const { Router } = require("express");

const router = Router();

router.get("", async (req, res) => {
  const characters = { test: true };
  res.status(200).json(characters);
});

module.exports = router;
