import express, { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  changeCurrentPassword,
  getCurrentUser,
  healthCheck,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatar,
  updateCoverImage,
  updateUserAccountDetails,
} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/health-check").post(healthCheck);
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-password").post(verifyJWT, changeCurrentPassword);
router.route("/user-details").post(verifyJWT, getCurrentUser);
router.route("/update-user-details").post(verifyJWT, updateUserAccountDetails);
router
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), updateAvatar);
router
  .route("/update-cover-image")
  .post(verifyJWT, upload.single("coverImage"), updateCoverImage);

export default router;
