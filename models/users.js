const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    last_login: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "disabled"],
      default: "active",
    },
    profile_url: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
