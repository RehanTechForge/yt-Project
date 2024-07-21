import config from "../config/config.js";

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    config.ENV === "development" ? (this.stack = stack) : (stack = "");
  }
}
export default ApiError;
