const path = require('path');
const Dotenv = require('dotenv-webpack');

const rules = [
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
];

module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'umd/bundle.js',
    libraryTarget: 'umd',
    library: ["relayGQLApp"],
    path: path.resolve(__dirname, './lib'),
  },
  module: { rules: rules },
  plugins: [new Dotenv()],
};
