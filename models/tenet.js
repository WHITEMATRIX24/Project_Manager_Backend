const mongoose = require("mongoose");

const tenetSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    contact_info: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile_no: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    hq_address: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptions",
    },
    users: [
      {
        types: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
  },
  { timestamps: true }
);

const TenetModel = mongoose.model("tenet", tenetSchema);
module.exports = TenetModel;
