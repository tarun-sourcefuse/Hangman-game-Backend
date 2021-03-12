const {
  STATUS_CODE: { UNAUTHORIZED },
} = require("../constants");

const UserModel = require("../db/model/user");

module.exports = {
  // validate email exist with game or not
  loginValidate: async function (req, res, next) {
    const { email } = req.query;

    if (!email) next({ message: "Invalid User", status: UNAUTHORIZED });

    const user = await UserModel.findOne({ email }).populate("currentGame");
    if (!user) next({ message: "Invalid User", status: UNAUTHORIZED });

    req.user = user;
    next();
  },
};
