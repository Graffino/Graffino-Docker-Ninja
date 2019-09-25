const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const dotenv = require('dotenv').config({
  path: __dirname + '/.env' // eslint-disable-line no-path-concat
})

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.js'),
    vendor: path.resolve(__dirname, 'src/scripts/vendor.js')
  },
  output: {
    path: path.resolve(__dirname, `dist-wp/wp-content/themes/${process.env.THEME_NAME}`),
    filename: 'js/main.js',
    publicPath: '/'
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
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../'
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
        }]
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
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': dotenv.parsed
    }),
    new HtmlPlugin({
      filename: path.resolve(__dirname, `dist-wp/wp-content/themes/${process.env.THEME_NAME}/partials/sprite.php`),
      template: path.resolve(__dirname, 'wordpress/config/sprite.ejs'),
      inject: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/static'),
        to: path.resolve(__dirname, `dist-wp/wp-content/themes/${process.env.THEME_NAME}`),
        force: true
      },
      {
        from: path.resolve(__dirname, 'wordpress/theme'),
        to: path.resolve(__dirname, `dist-wp/wp-content/themes/${process.env.THEME_NAME}`),
        force: true
      },
      {
        from: path.resolve(__dirname, 'wordpress/config/*.php'),
        to: path.resolve(__dirname, 'dist-wp/'),
        force: true,
        flatten: true
      },
      {
        from: path.resolve(__dirname, 'wordpress/config/.htaccess'),
        to: path.resolve(__dirname, 'dist-wp/')
      },
      {
        from: path.resolve(__dirname, 'dist-wp/wp-content/uploads/'),
        to: path.resolve(__dirname, 'wordpress/uploads'),
        toType: 'dir',
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new BrowserSyncPlugin({
      files: ['src/**/*', 'wordpress/**/*'],
      proxy: process.env.THEME_URL,
      open: false
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
