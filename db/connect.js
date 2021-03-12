const mongoose = require("mongoose");

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGODB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) return reject(false);
        return resolve(true);
      }
    );
  });
};
