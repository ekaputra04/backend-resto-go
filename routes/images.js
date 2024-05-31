const express = require("express");

const router = express.Router();
const { uploadImageToImgbb } = require("../controllers/images");

router.post("/", uploadImageToImgbb);

module.exports = router;
