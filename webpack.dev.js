const path               = require('path'),
      HtmlWebpackPlugin  = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      hash: true,
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    tls: 'empty',
    fs: 'empty',
    net: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
