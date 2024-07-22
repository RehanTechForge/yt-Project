import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json(ApiError(401, "Unauthorized request"));
  }

  const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id).select(
    "-password refreshToken"
  );

  if (!user) {
    return res.status(401).json(ApiError(401, "Invalid Access Token"));
  }

  req.user = user;
  next();
});
export default verifyJWT;
