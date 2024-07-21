const _config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};

const config = Object.freeze(_config);
export default config;
