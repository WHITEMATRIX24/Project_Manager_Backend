const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
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
  },
  designation: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
