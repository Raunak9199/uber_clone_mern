const userModel = require("../models/user.model.js");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("Please provide all the required fields");
  }

  const user = userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
module.exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Please provide all the required fields");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  /* const user = userModel.create({
    email,
    password,
  }); */

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
};
