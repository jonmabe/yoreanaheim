var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map' ,
  entry: process.env.NODE_ENV === 'production' ? [
    'bootstrap-loader',
    path.resolve(ROOT_PATH, 'app/src/index')
  ] : [
    'bootstrap-loader',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'app/src/index'),
  ],
  //postcss: [autoprefixer],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: process.env.NODE_ENV === 'production' ? [] : ['eslint'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel?presets[]=react']
    },
    { include: /\.json$/, loaders: ["json-loader"]},
    { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
    { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /bootstrap[\/\\]js[\/\\]dist[\/\\]/, loader: 'imports?jQuery=jquery' },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    { test: /\.jpg$/, loaders:[
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false' ]}]
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'app/build'), //process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'app/dist') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Yore Anaheim',
			favicon: 'app/src/assets/favicons/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Alert: "exports?Alert!bootstrap/js/dist/alert",
      Button: "exports?Button!bootstrap/js/dist/button",
      Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports?Modal!bootstrap/js/dist/modal",
      Popover: "exports?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports?Tab!bootstrap/js/dist/tab",
      Util: "exports?Util!bootstrap/js/dist/util",
    })
  ]
};
