const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const { ApiResponse } = require("../utils/apiresponse.js");
const blackListTokenModel = require("../models/blacklistToken.model.js");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();

  res.status(200).json({
    token,
    user,
    message: "User created successfully",
  });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email: email })
    .select("+password")
    .exec();

  const hashPassword = await userModel.hashPassword(password);

  user = await userService.loginUser({
    email,
    password: hashPassword,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = user.generateAuthToken();

  res.cookie(
    "token",
    token /* {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  } */
  );

  res.status(200).json({
    token,
    user,
    message: "User logged in successfully",
  });
};

module.exports.getUserProfile = async (req, res, next) => {
  // const user = await userModel.findById(req.user._id).exec();
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User Profile Fetch Successfully"));
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  await blackListTokenModel.create({ token });
  return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
};
