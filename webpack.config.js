const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'public')
  },
  plugins: [new ErrorOverlayPlugin()],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    watchContentBase: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      }
    ]
  }
};
