const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  try {
    const jwtSecret = process.env.JWT_SECRET || "";
    const accessToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "10h",
    });
    return accessToken;
  } catch (error) {
    throw new Error(`error in creating access token error:${error}`);
  }
};

module.exports = { generateAccessToken };
