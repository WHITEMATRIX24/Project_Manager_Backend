const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active,completed", "onhold"],
      required: true,
    },
    primary_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
    },
    secondary_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("projects", projectSchema);
module.exports = ProjectModel;
