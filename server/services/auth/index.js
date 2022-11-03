//MongoDB Model
const User = require("../../models/user");
const AppError = require("../../utils/AppError");
const { verify } = require("../../utils/bcrypt");
const httpStatus = require("http-status-codes");

module.exports = {
  signin: async (body) => {
    try {
      const { email, password: plainPassword } = body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AppError(httpStatus.StatusCodes.NOT_FOUND, "Email not found");
      }

      //Check password is valid
      const isValidPassword = await verify(plainPassword, user.password);
      if (!isValidPassword) {
        throw new AppError(
          httpStatus.StatusCodes.BAD_REQUEST,
          "Password incorrect"
        );
      }

      return {
        user,
        message: "Sign in successfully!",
        statusCode: httpStatus.StatusCodes.OK,
      };
    } catch (error) {
      let statusCode = error.statusCode;

      if (!statusCode) {
        statusCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
      }
      throw new AppError(statusCode, error.message);
    }
  },
  signup: async (body) => {
    try {
      const { email, password } = body;

      //Check exist email
      let existEmail = await User.find({ email });

      if (existEmail.length === 0) {
        const user = await User.create({
          username: email,
          email,
          password,
        });

        return {
          user,
          message: "Sign up successfully!",
          statusCode: httpStatus.StatusCodes.OK,
        };
      } else {
        throw new AppError(
          httpStatus.StatusCodes.BAD_REQUEST,
          "Email was already registered!"
        );
      }
    } catch (error) {
      let statusCode = error.statusCode;

      if (!statusCode) {
        statusCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
      }
      throw new AppError(statusCode, error.message);
    }
  },
};
