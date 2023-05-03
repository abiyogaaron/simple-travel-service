const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  let envPath = `../.env.${env.NODE_ENV}`;

  console.log("(CLIENT) env path --> ", envPath);
  console.log("(CLIENT) is production mode --> ", isProduction);
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    watchOptions: {
      ignored: '/node_modules/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              module: {
                type: "commonjs",
                strict: false,
                strictMode: true,
                lazy: false,
                noInterop: false
              },
              jsc: {
                parser: {
                  syntax: 'typescript',
                  dynamicImport: true,
                  decorators: true,
                  tsx: true
                },
                target: 'es2016',
                baseUrl: ".",
              },
            }
          }
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.(s(a|c)ss|css)$/,
          exclude: /\.module\.(s(a|c)ss)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ['file-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        "browser": path.resolve(__dirname, "src/images"),
      }
    },
    optimization: {
      minimize: !isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
              beautify: false
            },
            warnings: false,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: true,
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, '../.env.development'),
        safe: true,
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!index.html'],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        filename: './index.html',
        inject: true,
        minify: false,
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
      }),
    ],
    devServer: {
      port: 3001,
      historyApiFallback: true,
      hot: true,
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
  }
}
