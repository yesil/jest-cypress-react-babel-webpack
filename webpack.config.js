const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    kent: ['./src/kent/index.tsx'],
    csseditor: ['./src/index.tsx'],
    thinlib: ['./src/thinlib/index.ts'],
    thicklib: ['./src/thicklib/index.ts'],
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name]-bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        /*configFile: "./path/to/tsconfig.json" */
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.module\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true, camelCase: true}},
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    historyApiFallback: true,
    // compress: true,
    // port: 9000
  },
}

if (process.env.npm_lifecycle_event === 'dev:client') {
  module.exports.mode = 'development'
}
