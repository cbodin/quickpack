const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options) => ({
  mode: options.development ? 'development' : 'production',

  entry: options.entry,

  output: {
    path: options.output,
    filename: options.js,
  },

  resolve: {
    extensions: ['.mjs', '.js', '.vue'],
  },

  module: {
    rules: [
      {
        test: /\.(p|post)?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true, config: { path: __dirname } } },
        ],
      },
      {
        test: /\.m?js$/,
        include: [
          options.input,
          ...options.modules,
        ],
        use: [
          { loader: 'babel-loader', options: { configFile: path.resolve(__dirname, 'babel.config.js') } },
        ],
      },
      {
        test: /\.(svg|png)$/,
        use: 'url-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: options.css }),
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    ...(options.template ? [
      new HtmlWebpackPlugin({
        filename: options.html,
        template: options.template,
        inject: false,
      })
    ] : []),
  ],

  devtool: 'source-map',
  stats: false,
  watch: options.development,
});
