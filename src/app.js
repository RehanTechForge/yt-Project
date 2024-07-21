import express from "express";
const app = express();
import cors from "cors";
import { CORS_OPTIONS } from "./constant.js";

app.use(cors(CORS_OPTIONS));

export default app;
