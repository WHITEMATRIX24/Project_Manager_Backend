const mongoose = require("mongoose");
const TenetModel = require("../models/tenet");

const createTenetController = async (req, res) => {
  try {
    const {
      company_name,
      industry,
      size,
      contact_info,
      hq_address,
      created_by,
      subscription_id,
    } = req.body;

    if (
      !company_name ||
      !industry ||
      !size ||
      !contact_info.phone ||
      !contact_info.email ||
      !contact_info.mobile_no ||
      !hq_address ||
      !created_by ||
      !subscription_id
    )
      return res.status(400).json({ message: "incomplete request" });

    // is company exists
    const isComapanyExists = await TenetModel.findOne({
      company_name,
      hq_address,
    });
    if (isComapanyExists)
      return res.status(400).json({ message: "company already exists" });

    await new TenetModel({
      company_name,
      industry,
      size,
      contact_info,
      hq_address,
      created_by,
      subscription: subscription_id,
      users: [created_by],
    }).save();

    res.status(200).json({ message: "creation successfull" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const tenetDetailsById = async (req, res) => {
  try {
    const { tenetId } = req.params;

    if (!tenetId)
      return res.status(400).json({ message: "Incomplete request" });

    const tenetData = await TenetModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(`${tenetId}`) },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "user_details",
          pipeline: [
            {
              $project: {
                full_name: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "projects",
          foreignField: "_id",
          as: "project_details",
          pipeline: [
            {
              $project: {
                name: 1,
                description: 1,
              },
            },
          ],
        },
      },
    ]);

    res.status(200).json({ message: "sucess", tenet_data: tenetData[0] });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const deleteTenetById = async (req, res) => {
  try {
    const { tenetId } = req.params;

    if (!tenetId)
      return res.status(400).json({ message: "Incomplete request" });

    // delete tenet
    const deletedTenet = await TenetModel.findByIdAndDelete(tenetId);

    res.status(200).json({ message: "seletion sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createTenetController,
  tenetDetailsById,
  deleteTenetById,
};
