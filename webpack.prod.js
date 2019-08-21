const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: [],
  plugins: []
});
