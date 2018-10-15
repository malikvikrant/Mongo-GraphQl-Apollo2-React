const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    './src/client/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: 'bundle.js',
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css?$/,
      loader: 'style-loader!css-loader',
    },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/client/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    hot: true,
  },
};
