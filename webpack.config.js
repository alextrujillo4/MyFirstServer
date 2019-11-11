const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./public/app.scss', './public/app.js'],
  output: {
    path: __dirname + "/public/", // or path: path.join(__dirname, "dist/js"),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,

        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              }
            },
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      }
    ],
  },
};