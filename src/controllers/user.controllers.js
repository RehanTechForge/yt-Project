import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { COOKIE_OPTIONS } from "../constant.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(`Error While Generate Access Token and Refresh Token ${error}`);
  }
};

const healthCheck = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    message: "All Ok...",
  });
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, fullName, email, password } = req.body;
  if (!username || !email || !fullName || !password) {
    return res
      .status(401)
      .json(new ApiError(401, null, "All Fields Are Required"));
  }
  if (
    username.trim() === "" ||
    fullName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res
      .status(401)
      .json(new ApiError(401, null, "Please Field out this Field Properly"));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(402).json(new ApiError(401, null, "User Already Exist"));
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    return res.status(402).json(new ApiError(401, null, "Avatar Required"));
  }
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    return res
      .status(402)
      .json(new ApiError(401, null, "Error While Avatar Uploading"));
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(402)
      .json(new ApiError(401, null, "Error While Avatar Uploading"));
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Register Successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json(new ApiError(401, null, "All Fields are Required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, null, "User Not Found In Database"));
  }

  const isPasswordCorrect = await user.isComparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json(new ApiError(401, null, "Invalid Credentials"));
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User LoggedIn SuccessFully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiError(401, null, "Token Not Found"));
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    config.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, null, "Invalid refresh token"));
  }

  if (decodedToken._id !== user?.refreshToken) {
    return res
      .status(401)
      .json(new ApiError(401, null, "Refresh token is expired or used"));
  }

  const { accessToken, newRefreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(401).json(new ApiError(401, null, "User Not Found"));
  }

  const isPasswordCorrect = await user.isComparePassword(oldPassword);

  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json(new ApiError(401, null, "Password Are Incorrect"));
  }

  if (newPassword !== confPassword) {
    return res
      .status(401)
      .json(new ApiError(401, null, "Please Check Your Password"));
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        password: newPassword,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Change SuccessFully"));
});

export {
  healthCheck,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
};
