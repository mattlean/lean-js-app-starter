const path = require("path");

module.exports = {
  PATH_ROOT: __dirname,
  PATH_BUILD: path.resolve(__dirname, "build"),
  PATH_BUILD_DEV: path.resolve(__dirname, "build/development"),
  PATH_BUILD_PROD: path.resolve(__dirname, "build/production"),
  PATH_SRC: path.resolve(__dirname, "src"),
};
