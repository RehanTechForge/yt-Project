import express, { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  healthCheck,
  loginUser,
  logoutUser,
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

export default router;
