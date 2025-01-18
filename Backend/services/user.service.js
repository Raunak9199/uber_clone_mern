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

  const user = userModel.create({
    email,
    password,
  });

  return user;
};
