const path = require("path");

module.exports = {
  PATH_ROOT: __dirname,
  PATH_BACKEND_BUILD_DEV: path.resolve(__dirname, "build/development/backend"),
  PATH_BACKEND_BUILD_PROD: path.resolve(__dirname, "build/production/backend"),
  PATH_BACKEND_SRC: path.resolve(__dirname, "src/backend"),
  PATH_BUILD: path.resolve(__dirname, "build"),
  PATH_BUILD_DEV: path.resolve(__dirname, "build/development"),
  PATH_BUILD_PROD: path.resolve(__dirname, "build/production"),
  PATH_COMMON_SRC: path.resolve(__dirname, "src/common"),
  PATH_FRONTEND_BUILD_DEV: path.resolve(
    __dirname,
    "build/development/frontend",
  ),
  PATH_FRONTEND_BUILD_PROD: path.resolve(
    __dirname,
    "build/production/frontend",
  ),
  PATH_FRONTEND_SRC: path.resolve(__dirname, "src/frontend"),
  PATH_PLAYWRIGHT_SRC: path.resolve(__dirname, "src/playwright"),
  PATH_SRC: path.resolve(__dirname, "src"),
};
