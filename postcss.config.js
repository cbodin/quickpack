module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-custom-media')({ preserve: false }),
    require('postcss-custom-properties')({ preserve: false }),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
