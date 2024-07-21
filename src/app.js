import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_OPTIONS, JSON_LIMIT, URL_LIMIT } from "./constant.js";

app.use(cors(CORS_OPTIONS));
app.use(express.static("public"));
app.use(express.json(JSON_LIMIT));
app.use(express.urlencoded(URL_LIMIT));
app.use(cookieParser());

export default app;
