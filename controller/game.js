const Joi = require("@hapi/joi");
const { createResponse } = require("../utils/miscllaneous");
const GameModel = require("../db/model/game");
const ObjectId = require("mongoose").Types.ObjectId;
const { hideCharacters } = require("../utils/miscllaneous");

const startGame = async (req, res, next) => {
  if (req.user && req.user.currentGame && req.currentGame.attempts > 0) {
    const gameData = await GameModel.findOne(
      { _id: req.user.currentGame },
      { _id: 0, __v: 0 }
    );

    const { word, hint, correctWords, guessWords, attempts } = gameData;
    return res.send(
      createResponse(
        null,
        {
          hint,
          correctWords,
          guessWords,
          attempts,
          word: hideCharacters(word, correctWords),
        },
        null
      )
    );
  }

  services.game
    .createWord()
    .then((gameData) => {
      if (!gameData) next("Something went wrong");
      req.user.currentGame = gameData._id;
      req.user.save();

      const { word, correctWords, hint, guessWords, attempts } = gameData;
      res.send(
        createResponse(
          null,
          {
            word: hideCharacters(word, correctWords),
            hint: hint,
            attempts: attempts,
            correctWords: correctWords,
            guessWords: guessWords,
          },
          null
        )
      );
    })
    .catch((e) => reject(e));
};

const guessWord = async (req, res, next) => {
  if (req.user && !req.user.currentGame) return next("Start game first.");
  if (req.user.currentGame && req.user.currentGame.attempts === 0) {
    req.user.currentGame = null;
    req.user.save();
    return next("Start game first.");
  }

  const schema = Joi.object().keys({
    character: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .pattern(new RegExp("[a-z]"))
      .required(),
  });

  const { character } = req.query;

  const { error } = schema.validate({ character });

  if (error) {
    next("Invalid data");
  } else {
    const gameSession = await GameModel.findOne({
      _id: req.user.currentGame._id,
    });

    let isCorrect = false,
      msg = null,
      gameOver = false;

    let {
      word,
      correctWords = [],
      guessWords = [],
      hint,
      attempts,
      _id,
    } = gameSession;

    if (guessWords.includes(character)) return next("Word cannot be repeat");

    if (word.toLowerCase().includes(character)) isCorrect = true;

    if (isCorrect) {
      const matchPattern = new RegExp(character, "g");
      const matchCount = word.match(matchPattern).length;

      correctWords = [
        ...new Array(matchCount).fill(character),
        ...correctWords,
      ];
    }

    // if not correct decrease attempt
    !isCorrect && attempts--;

    guessWords.push(character);

    if (attempts === 0) {
      msg = "You loss";
      gameOver = true;
    }
    if (correctWords.length === word.length) {
      msg = "You won";
      gameOver = true;
    }

    if (gameOver) {
      req.user.currentGame = null;
      req.user.save();
    }

    //upadate game session
    await GameModel.updateOne(
      { _id: ObjectId(_id) },
      {
        correctWords,
        guessWords,
        attempts,
      }
    );

    return res.send(
      createResponse(
        msg,
        {
          hint,
          word: hideCharacters(word, correctWords),
          correctWords,
          guessWords,
          isCorrect,
          gameOver,
          attempts,
        },
        null
      )
    );
  }
};

module.exports = {
  startGame,
  guessWord,
};
