const Joi = require("@hapi/joi");

//db models
const UserModel = require("../db/model/user");

const login = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next({ error, status: "" });
  } else {
    services.user.create(value);
    res.send("done");
  }
};

module.exports = {
  login,
};
