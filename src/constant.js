import config from "./config/config.js";

const DB_NAME = "yt";
const CORS_OPTIONS = {
  origin: config.FRONTEND_URL,
};
export { DB_NAME, CORS_OPTIONS };
