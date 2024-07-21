import mongoose from "mongoose";
import config from "../config/config.js";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    mongoose.connection.on(`connected`, () => {
      console.log(`Mongodb Connected Successfully`);
    });
    mongoose.connection.on(`disconnected`, () => {
      console.log(`Mongodb Disconnected While Checking...`);
    });
    mongoose.connection.on(`error`, (error) => {
      console.log(`Mongodb Connection Error ${error}`);
    });
    await mongoose.connect(`${config.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    console.log(`Mongodb Connection Failed ${error}`);
    process.exit(1);
  }
};
export default connectDB;
