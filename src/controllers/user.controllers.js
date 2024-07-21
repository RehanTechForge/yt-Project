import asyncHandler from "../utils/asyncHandler.js";
const healthCheck = asyncHandler(async (req, res, next) => {
  return res.status(200).json({
    message: "All Ok...",
  });
});
export { healthCheck };
