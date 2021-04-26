const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { copyFile } = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./javascript/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/favicon.ico"),
          to: "assets",
        },
      ],
    }),
  ],
  devServer: {
    port: 4200,
    hot: isDev,
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          "style-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          //"style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
