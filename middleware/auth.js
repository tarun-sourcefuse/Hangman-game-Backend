module.exports = {
  // validate email exist with game or not
  loginValidate: function (req, res, next) {
    console.log(req.body);
    next();
  },
};
