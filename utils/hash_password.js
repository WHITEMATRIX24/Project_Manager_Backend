const bcrypt = require("bcryptjs");

// simple password hasher
const hashPassword = (rawPassword) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(rawPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error in password hassing");
  }
};

// compare the password
const comparePassword = async (rawPassword, hashedPassword) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(rawPassword, hashedPassword);
    return isPasswordCorrect;
  } catch (error) {
    throw new Error("Error in comparing password hassing");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
