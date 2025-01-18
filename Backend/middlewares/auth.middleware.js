const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiresponse.js");
const blackListTokenModel = require("../models/blacklistToken.model.js");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized Request."));
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized Request."));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json(new ApiResponse(401, {}, "Invalid Token."));
    }
    req.id = decodedToken._id;
    /*  const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
  
      if (!user) {
        throw new ApiError(401, "Invalid Access Token.");
      }
  
      req.user = user; */
    req.user = user;
    return next();
  } catch (error) {
    throw new ApiResponse(401, error?.message || "Invalid Access Token.");
  }
};
