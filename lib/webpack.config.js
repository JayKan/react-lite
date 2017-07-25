'use strict';

const webpack = require('webpack');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'build/ReactLite.js',
    libraryTarget: 'var',
    library: 'ReactLite'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new OccurrenceOrderPlugin(),
    new CircularDependencyPlugin(),
  ]
};

