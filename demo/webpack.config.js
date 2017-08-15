'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  js: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  scss: {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader',
  }
};

module.exports = {
  devtool: 'hidden-source-map',
  resolve: {
    extensions: ['.js'],
    mainFields: ['module', 'browser', 'main'],
    modules: [
      path.resolve('.'),
      'node_modules',
    ],
  },
  entry: {
    main: ['./app.js']
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      rules.js,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?-autoprefixer!postcss-loader!sass-loader')
      }
    ]
  },
  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        postcss: [
          autoprefixer({ browsers: ['last 3 versions'] })
        ],
        sassLoader: {
          outputStyle: 'compressed',
          precision: 10,
          sourceComments: false
        }
      }
    }),
    new ExtractTextPlugin('./styles.css'),
    new NoEmitOnErrorsPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false,
    }),
    new WebpackMd5Hash(),
    new OccurrenceOrderPlugin(),
    new AggressiveMergingPlugin(),
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        dead_code: true, // eslint-disable-line camelcase
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    }),
  ]
};