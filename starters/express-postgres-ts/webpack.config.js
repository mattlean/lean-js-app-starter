const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

module.exports = (env, { mode }) => {
  switch (mode) {
    case "production": {
      return merge(commonConfig, require("./webpack.production"));
    }

    default: {
      return merge(commonConfig, require("./webpack.development"));
    }
  }
};
