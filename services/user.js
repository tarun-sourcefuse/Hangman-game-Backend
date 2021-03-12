const UserModel = require("../db/model/user");
const convertObjectID = require("mongoose").Types.ObjectId;

module.exports = {
  name: "user",
  val: {
    create: (userData) => {
      const user = new UserModel({
        ...userData,
      });

      user.save(function (err, result) {
        console.log(err, result);
      });
    },
  },
};
