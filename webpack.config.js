module.exports = {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    static: './dist'
  }
}