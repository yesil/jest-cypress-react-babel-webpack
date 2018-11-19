const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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

// if (process.env.npm_lifecycle_event === 'dev:client') {
//   module.exports.mode = 'development'
// }
