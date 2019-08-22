const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: [],
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/favicon.svg'),
      icons: {
        twitter: true,
        windows: true
      },
      inject: true,
      background: '#fff',
      title: 'Graffino Ninja',
    })
  ]
});
