require('es6-promise').polyfill();
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('style.css');

const PROD = (process.env.NODE_ENV === 'production');
const plugins = [extractCss];
if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: __dirname + '/src/app.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        loader: extractCss.extract('style', [
          'css?modules',
          'postcss',
        ]),
      },
    ],
  },
  plugins: plugins,
  postcss: function () {
    return [
      require('postcss-import')(),
      require('postcss-cssnext')(),
    ];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
