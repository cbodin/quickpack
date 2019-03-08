const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (options) => ({
  mode: options.development ? 'development' : 'production',

  entry: options.entry,

  output: {
    path: options.output,
    filename: options.js,
  },

  resolve: {
    extensions: ['.mjs', '.js', '.json', '.pcss', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.p?css$/,
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
        test: /\.(svg|png)/,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: options.css }),
    new FriendlyErrorsWebpackPlugin(),
  ],

  devtool: 'source-map',
  stats: false,
  watch: options.development,
});
