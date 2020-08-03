const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    liveReload: true,
    http2: false,
    https: false,
    host: '127.0.0.1',
    port: 3000,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false
    },
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src/styles/'),
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name][hash].js',
    publicPath: '/'
  }
})
