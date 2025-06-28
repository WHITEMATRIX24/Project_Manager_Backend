const Comment = require("../models/comment");
const Task = require('../models/tasks')
const getCommentsController = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
const addCommentController = async (req, res) => {
  const { taskId } = req.params;
  const { message, commented_by } = req.body;
  console.log('Received taskId:', taskId);
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    let commentThread;

    // Check if comments is null or empty
    if (!task.comments || task.comments.length === 0) {
      commentThread = new Comment({
        messages: [
          {
            message,
            commented_by
          }
        ]
      });

      await commentThread.save();

      // link the new comment thread to task
      task.comments = [commentThread._id];
      await task.save();
    } else {
      commentThread = await Comment.findById(task.comments[0]);

      if (!commentThread) {
        return res.status(404).json({ success: false, message: "Comment thread not found" });
      }

      commentThread.messages.push({
        message,
        commented_by,
      });

      await commentThread.save();
    }

    res.status(200).json({ success: true, commentThread });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  getCommentsController,
  addCommentController,
};
