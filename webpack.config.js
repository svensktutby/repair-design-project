'use strict';

const webpackStream = require('webpack-stream'),
      webpack = webpackStream.webpack,
      isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: isProd ? 'none' : 'eval-sourcemap',
  output: {
    publicPath: '/js/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  // externals: {
  //   jquery: 'jQuery' // if we take jQuery from CDN
  // },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
