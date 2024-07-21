const _config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

const config = Object.freeze(_config);
export default config;
