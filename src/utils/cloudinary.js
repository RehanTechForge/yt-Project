import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import config from "../config/config.js";
// Configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "yt",
    });
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.log(`Error While Upload On Cloudinary ${error}`);
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
