const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact.controller");

router.post("/", contactController.createConatct);

router.get("/", contactController.getAllContacts);

module.exports = router;
