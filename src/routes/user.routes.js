import express, { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  changeCurrentPassword,
  healthCheck,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
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
router.route("/update-password").post(changeCurrentPassword);

export default router;
