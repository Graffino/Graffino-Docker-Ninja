const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const dotenv = require('dotenv').config({
  path: __dirname + '/.env' // eslint-disable-line no-path-concat
})

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.js'),
    vendor: path.resolve(__dirname, 'src/scripts/vendor.js')
  },
  output: {
    path: path.resolve(
      __dirname,
      `dist-wp/wp-content/themes/${process.env.THEME_NAME}`
    ),
    filename: 'js/main.js',
    publicPath: '../'
  },
  watchOptions: {
    ignored: ['node_modules', 'dist', 'dist-wp', 'composer', 'cache']
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
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/scripts/'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    regenerator: true
                  }
                ]
              ]
            }
          },
          'eslint-loader'
        ]
      },
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
              sourceMap: true,
              config: {
                path: path.join(__dirname, '/postcss.config.js')
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
      },
      {
        test: /\.(woff|woff2)$/,
        include: path.resolve(__dirname, 'src/fonts/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/icons/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'icons/',
              publicPath: '../icons/'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  removeAttrs: {}
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: path.resolve(__dirname, 'src/images/'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '../images/'
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
                quality: [0.65, 0.9],
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
      'process.env': dotenv.parsed
    }),
    new SVGSpritemapPlugin(['src/icons/*.svg'], {
      output: {
        filename: 'icons/sprite.svg',
        chunk: {
          name: 'sprite.svg',
          keep: true
        },
        svgo: {
          plugins: [
            {
              removeAttrs: {}
            }
          ]
        }
      },
      sprite: {
        prefix: false
      },
      styles: {
        filename: 'src/styles/vendor/sprite.scss'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      // TODO: Temp fix until next version of CopyPlugin to prevent conflicts
      // https://github.com/webpack-contrib/copy-webpack-plugin/issues/385
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/static'),
        to: path.resolve(
          __dirname,
          `dist-wp/wp-content/themes/${process.env.THEME_NAME}`
        ),
        force: true
      },
      {
        from: path.resolve(__dirname, 'wordpress/theme'),
        to: path.resolve(
          __dirname,
          `dist-wp/wp-content/themes/${process.env.THEME_NAME}`
        ),
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
    new StyleLintPlugin(),
    new BrowserSyncPlugin({
      files: [
        'dist/**/*.css',
        'dist/**/*.js',
        'dist-wp/wp-content/themes/**/*.css',
        'dist-wp/wp-content/themes/**/*.js',
        'wordpress/**/*.php'
      ],
      ignore: 'sprite.php',
      proxy: process.env.THEME_URL,
      open: false,
      https: {
        cert: 'certs/cert.pem',
        key: 'certs/privkey.pem'
      },
      injectCss: true,
      notify: false,
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
      },
      watchOptions: {
        ignored: ['sprite.php']
      },
      logLevel: 'silent'
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
