const Comment = require("../models/comment");

const getCommentsController = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  getCommentsController,
};
