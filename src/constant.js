import config from "./config/config.js";

const DB_NAME = "yt";
const CORS_OPTIONS = {
  origin: config.FRONTEND_URL,
  credentials: true,
};
const JSON_LIMIT = {
  limit: "16kb",
};
const URL_LIMIT = {
  limit: "16kb",
  extended: true,
};
export { DB_NAME, CORS_OPTIONS, JSON_LIMIT, URL_LIMIT };
