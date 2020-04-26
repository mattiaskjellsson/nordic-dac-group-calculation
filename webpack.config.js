const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: [
    './app/app.jsx'],
  externals: {
  },
  plugins: [
    new webpack.ProvidePlugin({
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
