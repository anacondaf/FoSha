const authService = require("../../services/auth");

module.exports = {
  signin: async (req, res, next) => {
    try {
      let dto = await authService.signin(req.body);
      res.status(200).json(dto);
    } catch (error) {
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      let dto = await authService.signup(req.body);
      res.status(200).json(dto);
    } catch (error) {
      next(error);
    }
  },
};
