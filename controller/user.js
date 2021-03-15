const Joi = require("@hapi/joi");
const { createResponse } = require("../utils/miscllaneous");

const login = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    next("Invalid data");
  } else {
    services.user
      .create(value.email)
      .then((userData) => {
        const { email, _id } = userData;
        res.send(createResponse("Login Successfully", { email, _id }, null));
      })
      .catch((error) => {
        next(error);
      });
  }
};

module.exports = {
  login,
};
