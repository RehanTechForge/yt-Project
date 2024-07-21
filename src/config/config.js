const _config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  ENV: process.env.ENV,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

const config = Object.freeze(_config);
export default config;
