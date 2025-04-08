const mongoose = require("mongoose");
const UserModel = require("../models/users");
const { hashPassword, comparePassword } = require("../utils/hash_password");
const { generateAccessToken } = require("../utils/tokenization");
const TenetModel = require("../models/tenet");

const registerController = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      role_id,
      manager_id,
      bio,
      designation,
    } = req.body;

    if (!full_name || !email || !password || !role_id || !manager_id)
      return res.status(400).json({ message: "Incomplete request" });

    // check is exists
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) return res.status(400).json({ message: "user exists" });

    // password hashing
    const hashedPassword = hashPassword(password);

    await new UserModel({
      email,
      password: hashedPassword,
      full_name,
      bio,
      designation,
      manager: new mongoose.Types.ObjectId(`${manager_id}`),
      roles: new mongoose.Types.ObjectId(`${role_id}`),
      profile_url: null,
      last_login: null,
    }).save();

    res.status(200).json({ message: "account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Incomplete request" });

    // user data
    const user = await UserModel.findOne({ email });

    // not exists
    if (!user) return res.status(400).json({ message: "user not exists" });

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);

    delete user.password;

    // tenet data
    const tenetData = await TenetModel.find(
      {
        users: user._id,
      },
      {
        company_name: 1,
        industry: 1,
        contact_info: 1,
        hq_address: 1,
      }
    );

    res.status(200).json({
      message: "sucess",
      data: {
        access_token: accessToken,
        user: {
          ...user.toObject(),
          password: undefined,
        },
        tenet_data: tenetData,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  registerController,
  loginController,
};
