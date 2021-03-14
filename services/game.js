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
            let { word, definition: hint } = res || {};

            word = word.toLowerCase();
            const correctWords = [word[0], word[word.length - 1]];
            if (!word || !hint) reject("Something went wrong");

            gameSession = await GameModel.create({
              word,
              hint,
              correctWords,
              guessWords: correctWords,
            }).catch((e) => reject(e));

            resolve(gameSession);
          })
          .catch((err) => reject("Something went wrong"));
      });
    },
  },
};
