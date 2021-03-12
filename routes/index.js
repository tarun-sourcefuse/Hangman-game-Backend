const express = require("express");
const router = express.Router();

//middlewares
const authMiddleware = require("../middleware/auth");

//controllers
const userController = require("../controller/user");
const gameController = require("../controller/game");

//api routes
router.group("/api", (app) => {
  app.get("/login", userController.login);
  app.get("/startGame", authMiddleware.loginValidate, gameController.startGame);
  app.get("/guessWord", authMiddleware.loginValidate, gameController.guessWord);
});

//React dashboard view route
// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
