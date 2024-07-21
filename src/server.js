import "dotenv/config";
import connectDB from "./db/db.js";
import app from "./app.js";
import config from "./config/config.js";

const connectServer = async () => {
  try {
    await connectDB();
    app.on(`error`, (error) => {
      console.log(`Error While Connecting To The Server ${error}`);
    });
    app.listen(config.PORT || 3000, () => {
      console.log(`Server is Listen On ${config.PORT} Port`);
    });
  } catch (error) {
    console.log(`Error While Connecting Server Please Wait... ${error}`);
  }
};
connectServer();
