"use strict";

import path from "path";
import nodeExternals from "webpack-node-externals";

process.env.NODE_ENV = "development";
const __dirname = path.resolve(path.dirname(""));

export default {
  cache: false,
  entry: "/src/app.ts",
  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "server.cjs",
  },
  mode: "development",
  resolve: {
    extensions: ["*", ".js", ".json", ".ts"],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
