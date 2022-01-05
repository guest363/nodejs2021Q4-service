'use strict';

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

process.env.NODE_ENV = 'production';
const __dirname = path.resolve(path.dirname(''));

export default {
  cache: false,
  entry: '/src/app.ts',
  output: {
    path: path.resolve(__dirname, './build/'),
    charset: true,
    clean: true,
    filename: 'server.cjs',
  },
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.json', '.ts'],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
          },
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
};
