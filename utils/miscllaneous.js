const secureGlobal = (name, obj) => {
  Object.defineProperty(global, name, {
    value: obj,
    writable: false,
  });
};

const createResponse = (msg, data, error) => {
  return { error, data, msg, success: !!error };
};

const hideCharacters = (word, matched) => {
  return word
    .split("")
    .reduce(
      (acc, character) => acc + (matched.includes(character) ? character : "*")
    );
};

module.exports = {
  secureGlobal,
  createResponse,
  hideCharacters,
};
