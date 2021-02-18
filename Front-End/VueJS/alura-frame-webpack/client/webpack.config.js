const path = require("path");
const babiliWebpackPlugin = require("babili-webpack-plugin");
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");
const optimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

let plugins = [
  new HTMLWebpackPlugin({
    hash: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html',
  }),
  new extractTextWebpackPlugin("style.css"),
  new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js",
  }),
];

if (process.env.NODE_ENV === "production")
  plugins = [
    ...plugins,
    new babiliWebpackPlugin(),
    new optimizeCSSAssetsWebpackPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
  ];

module.exports = {
  entry: {
    name: "./app-src/app.js",
    vendor: ["bootstrap", "reflect-metadata"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  plugins,
};
