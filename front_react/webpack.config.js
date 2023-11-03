const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js', // Cambia 'index.js' por el nombre de tu archivo principal
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ruta al archivo HTML en la carpeta 'public'
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    open: true,
  },
};
