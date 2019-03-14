const path = require('path');
const configPath = path.resolve(__dirname, 'webpack.config.js');
const config = require(configPath);

module.exports = config({
  development: true,
  input: 'src/',
  output: 'dist/',
  entry: 'src/index.js',
  template: 'src/index.html',
  js: 'bundle.js',
  css: 'style.css',
  html: 'index.html',
  modules: [],
});
