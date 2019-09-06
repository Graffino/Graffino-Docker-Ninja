const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const dotenv = require('dotenv').config({
  path: __dirname + '/.env'
})

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.js'),
    vendor: path.resolve(__dirname, 'src/scripts/vendor.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
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
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: path.resolve(__dirname, 'src/icons/'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            outputPath: 'fonts'
          }
        }]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/icons/'),
        use: [{
            loader: 'svg-sprite-loader',
            options: {
              extract: true
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{
                removeAttrs: {
                  attrs: '*:(stroke|fill):((?!^none$).)*'
                }
              }]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: path.resolve(__dirname, 'src/icons/'),
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['wp-content/themes/ninja/**/*', '!wp-content/uploads/**/*']
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'wordpress/theme'),
        to: path.resolve(__dirname, 'theme/wp-content/themes/ninja')
      },
      {
        from: path.resolve(__dirname, 'wordpress/config/*.php'),
        to: path.resolve(__dirname, 'theme/'),
        flatten: true,
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new BrowserSyncPlugin({
      files: '**/*.php',
      proxy: process.env.THEME_URL,
    })
  ],
  output: {
    path: path.resolve(__dirname, `theme/wp-content/themes/${process.env.THEME_NAME}`),
    filename: 'main.js',
    publicPath: '/'
  }
}
