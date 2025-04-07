const express = require("express");
const router = express.Router();
const { getCommentsController } = require("../controllers/comments");

// Get all comments
router.get("/", getCommentsController);

module.exports = router;
