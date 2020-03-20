const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/views/'),
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src/styles/'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
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
              sourceMap: true,
              config: {
                path: path.join(__dirname, '/postcss.config.js'),
                ctx: {
                  env: 'production'
                }
              }
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
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true
      })
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style[contentHash].css',
      chunkFilename: 'css/[id].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(
        path.join(__dirname, './src/views/**/*.handlebars')
      ),
      extractors: [{
        extractor: content => content.match(/[A-z0-9-:/]+/g) || [],
        extensions: ['handlebars', 'html', 'js', 'php', 'vue']
      }],
      whitelistPatterns: [/^is-/, /^has-/, /^animation-/, /^debug/, /^h-/, /^d-/, /^nav/, /^-nav/, /^-submenu/, /^submenu/, /^nwp-/, /^post-/, /^page-/, /^slide-/, /^icon/, /^noUi/, /^choices/, /data-.*/]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      cacheFolder: './cache/img',
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: ({
        quality: '65-90'
      }),
      plugins: [imageminMozjpeg({
        quality: '75'
      })]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/'
  }
})
