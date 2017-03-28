var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var { getIfUtils, removeEmpty } = require('webpack-config-utils');
var helpers = require('./helpers');
var clone = require('js.clone');
var nodeExternals = require('webpack-node-externals');

module.exports = (env) => {

  var { ifProd } = getIfUtils(env);

  return {
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('node_modules')]
    },
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: helpers.root('src', 'tsconfig.json') }
            } , 'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
        },
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader'
        }
      ]
    },
    plugins: removeEmpty([
      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      ifProd(new ExtractTextPlugin('[name].[hash].css'), 
             new ExtractTextPlugin('[name].css')),
      ifProd(new webpack.NoEmitOnErrorsPlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
              htmlLoader: {
                  minimize: false // workaround for ng2
              }
            })),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd(JSON.stringify('production'))
        }
      })
    ]),
    devtool: ifProd('source-map', 'cheap-module-eval-source-map'),
    devServer: {
      historyApiFallback: true,
      stats: 'minimal'
    },
    output: {
        path: helpers.root('dist/client'),
        publicPath: ifProd('/', 'http://localhost:8080/'),
        filename: ifProd('[name].[hash].js', '[name].js'),
        chunkFilename: ifProd('[id].[hash].chunk.js', '[id].chunk.js')
    },
  }
};

