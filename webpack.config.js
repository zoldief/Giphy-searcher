const path = require("path");

module.exports = {
  entry: "./src/assets/javascript/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
