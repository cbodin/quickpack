const path = require('path');
const configPath = path.resolve(__dirname, 'webpack.config.js');
const config = require(configPath);

module.exports = config({
  development: true,
  input: 'src/',
  entry: 'src/index.js',
  output: 'dist/',
  js: 'bundle.js',
  css: 'style.css',
  modules: [],
});
