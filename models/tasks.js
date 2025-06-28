const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tenet",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["todo", "doing", "done"],
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
    comments:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    estimated_time: {
      type: Date,
      required: true,
    },
    parent_module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
    is_active: {
      type: Boolean,
      required: true,
    },
    task_closure_time: {
      type: Date,
    },
    task_closure_comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", taskSchema);
module.exports = TaskModel;
