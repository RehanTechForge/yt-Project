import express, { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { healthCheck, registerUser } from "../controllers/user.controllers.js";
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

export default router;
