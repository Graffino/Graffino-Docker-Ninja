const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {},
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: []
};
