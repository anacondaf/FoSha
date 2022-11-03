class AppError extends Error {
  constructor(statusCode, message) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = AppError;
