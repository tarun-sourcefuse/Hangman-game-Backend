const express = require("express");
const router = express.Router();

//controllers
const userController = require("../controller/user");

//api routes
router.group("/api", (app) => {
  app.get("/login", userController.login);
});

//React dashboard view route
// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   console.log('yeah');
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
