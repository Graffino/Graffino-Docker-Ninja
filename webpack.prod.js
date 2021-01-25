const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/views/'),
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
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
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.join(__dirname, '/postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {}
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        test: /^(?!style).*\.css$/g,
        minify: async (data, inputMap) => {
          // eslint-disable-next-line global-require
          const CleanCSS = require('clean-css')
          const [[filename, input]] = Object.entries(data)
          const minifiedCss = await new CleanCSS({
            level: {
              2: {
                mergeSemantically: true
              }
            }
          }).minify({
            [filename]: {
              styles: input
            }
          })

          return {
            css: minifiedCss.styles,
            warnings: minifiedCss.warnings,
            errors: minifiedCss.errors
          }
        }
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true
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
    new webpack.ids.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[fullhash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[fullhash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(
        [
          path.join(__dirname, './src/**/*.html'),
          path.join(__dirname, './src/**/*.handlebars'),
          path.join(__dirname, './src/**/*.js'),
          path.join(__dirname, './src/**/*.vue')
        ],
        { nodir: true }
      ),
      extractors: [
        {
          extractor: (content) => content.match(/[A-z0-9-:/]+/g) || [],
          extensions: ['handlebars', 'html', 'js', 'vue']
        }
      ],
      safelist: [
        /^is-/,
        /^has-/,
        /^animation-/,
        /^debug/,
        /^h-/,
        /^d-/,
        /^nav/,
        /^-nav/,
        /^-submenu/,
        /^submenu/,
        /^nwp-/,
        /^post-/,
        /^page-/,
        /^slide-/,
        /^icon/,
        /^noUi/,
        /^choices/,
        /^glide-/,
        /data-.*/,
        /^-weight-*/,
        /^-size-*/,
        /^animate__*/,
        /^-profile-*/
      ]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      cacheFolder: './cache/img',
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: {
        quality: '65-90'
      },
      plugins: [
        imageminMozjpeg({
          quality: '80'
        })
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? 'js/[name].js' : 'js/[name].[fullhash].js',
    publicPath: '/'
  }
})
