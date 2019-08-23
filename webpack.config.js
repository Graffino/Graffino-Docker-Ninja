const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    vendor: path.resolve(__dirname, 'src/vendor.js')
  },
  module: {
    rules: [
      {
        test: /\.(handlebars|hbs)$/,
        use: [{
            loader: 'handlebars-loader',
            options: {
              helperDirs: path.resolve(__dirname, 'src/html/helpers'),
              partialDirs: path.resolve(__dirname, 'src/html/partials'),
              precompileOptions: {
                knownHelpersOnly: false,
              }
            }
          },
          {
            loader: 'markup-inline-loader',
            options: {
              svgo: {
                plugins: [{
                    cleanupIDs: true
                  },
                  {
                    prefixIds: true
                  }
                ]
              }
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
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/static', to: '' }
    ]),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Ninja | Webpack Flow',
      filename: 'index.html',
      template: './src/html/index.handlebars'
    }),
    new HtmlWebpackPlugin({
      title: 'Ninja | 404',
      filename: '404.html',
      template: './src/html/404.handlebars'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    }),
    new StyleLintPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font';
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets'
    })
  ]
};
