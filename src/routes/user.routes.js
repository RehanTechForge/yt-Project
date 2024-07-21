import express, { Router } from "express";
import { healthCheck } from "../controllers/user.controllers.js";
const router = Router();

router.route("/health-check").post(healthCheck);

export default router;
