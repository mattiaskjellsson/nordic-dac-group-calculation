const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      Main: 'app/components/Main.jsx',
      ErrorModal: 'app/components/ErrorModal.jsx',
      applicationStyles: 'app/styles/app.scss',
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            [ "@babel/preset-env", 
              {
                "corejs": 3,
                "useBuiltIns": "entry",
                "targets": {
                  "esmodules": true
                }
              },
            ],
            '@babel/preset-react',
          ],
        },
        exclude:/(node_modules | bower_components)/,
      },
    ]
  },
};
