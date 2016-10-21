var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
module.exports = {

  target:  'web',
  cache:   false,
  context:  __dirname,
  debug:   false,
  devtool: 'source-map',
  entry:   ['./client/src/index'],
  output:  {
    path:          path.resolve(__dirname, "./public"),
    filename:      "app.js",
    chunkFilename: "[name].[id].js",
    publicPath:    "/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/src/index.html'),
      hash: true,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
    }),
  ],
  module:  {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' , query: { presets: ['react', 'stage-1'] } },
      { test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass?sourceMap')},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!less?sourceMap')},
      { test: /\.(gif|jpg|png|ico)$/, loader: 'url-loader?limit=100000'},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

    ],
    postLoaders: [
    ],
    noParse: /\.min\.js/
  },
  postcss: function() { return [autoprefixer]},
  resolve: {
    alias : {
      jquery : path.resolve(__dirname, './node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min'),
    },
    modulesDirectories: [
      "src",
      "node_modules"
    ], // relative path to a tree of directories containing modules.
    extensions: ['', '.json', '.js' , '.css'],
  },
  node:    {
    __dirname: true,
    fs:        'empty'
  }
};
