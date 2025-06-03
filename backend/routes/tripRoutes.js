const express = require("express");
const router = express.Router();

const { generateTrip } = require("../controller/tripController");

router.post("/generate-trip", generateTrip);

module.exports = router;
