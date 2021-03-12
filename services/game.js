const { RANDOM_WORD_API } = require("../constants/index");
const GameModel = require("../db/model/game");

module.exports = {
  name: "game",
  val: {
    createWord: async () => {
      return new Promise((resolve, reject) => {
        services.api
          .makeGetCall(RANDOM_WORD_API)
          .then(async (res) => {
            let gameSession = null;
            const { word, definition: hint } = res || {};

            if (!word || !hint) reject("Something went wrong");

            gameSession = await GameModel.create({ word, hint }).catch((e) =>
              reject(e)
            );

            resolve(gameSession);
          })
          .catch((err) => reject("Something went wrong"));
      });
    },
  },
};
