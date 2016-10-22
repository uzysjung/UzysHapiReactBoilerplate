var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config');
module.exports = {
  target:  "web",    //Compile for usage in a browser-like environment (default)
  cache:   true,
  context: __dirname,
  debug:   true,
  devtool: 'cheap-module-eval-source-map',
  stats: { colors: true },
  entry:   [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=http://localhost:'+ config.PORT+'/__webpack_hmr',
    'webpack/hot/only-dev-server',
    './client/src/index'
  ],
  output:  {
    path:          path.resolve(__dirname, "./public"),
    filename:      "app.js",
    chunkFilename: "[name].[id].js",
    publicPath:    "/"
  },
  plugins: [
    new webpack.DefinePlugin( { "process.env" : {NODE_ENV: '"development"'} }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname, './client/src/index.html'),
      hash : true,
      filename : 'index.html'
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
      {
        test: /\.js$/,
        include: path.join(__dirname,'client'),
        loaders: ['babel']
      },
      { test: /\.css$/, loaders: ['style', 'css?importLoaders=1', 'resolve-url' ,'postcss']},
      { test: /\.scss$/, loaders: ['style', 'css', 'resolve-url' ,'postcss', 'sass?sourceMap']},
      { test: /\.less$/, loaders: ['style', 'less' , 'css' ]},

      { test: /\.(gif|jpg|png|ico)$/, loader: 'url-loader?limit=100000'},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.json$/,   loader: 'json-loader' }
    ],

    noParse: /\.min\.js/
  },
  postcss: function() { return [require('autoprefixer')]},
  resolve: {
    alias : {
      jquery : path.resolve(__dirname, './node_modules/jquery/dist/jquery.min'),
    },
    modulesDirectories: [
      "src",
      "node_modules"
    ], // relative path to a tree of directories containing modules.
    extensions: ['', '.json', '.js' , '.css'],
  },
  // devOptions : { quiet : true},
  // hotOptions : { log : () => {}}
};


