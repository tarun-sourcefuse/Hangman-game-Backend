const fetch = require("node-fetch");

module.exports = {
  name: "api",
  val: {
    makeGetCall: async (url) => {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((res) => res.json())
          .then((json) => resolve(json[0]))
          .catch((err) => reject());
      });
    },
  },
};
