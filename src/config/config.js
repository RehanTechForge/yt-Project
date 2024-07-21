const _config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  ENV: process.env.ENV,
};

const config = Object.freeze(_config);
export default config;
