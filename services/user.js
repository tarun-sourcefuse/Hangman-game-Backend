const User = require("../db/model/user");
const UserModel = require("../db/model/user");

module.exports = {
  name: "user",
  val: {
    create: async (email) => {
      return new Promise(async (resolve, reject) => {
        let user = await UserModel.findOne({ email });

        if (!user)
          user = await UserModel.create({ email }).catch((e) => reject(e));

        resolve(user);
      });
    },
  },
};
