const express = require("express");
const router = express.Router();
const { getCommentsController, addCommentController } = require("../controllers/comments");

// Get all comments
router.get("/", getCommentsController);
router.post("/add/:taskId", addCommentController);
module.exports = router;
