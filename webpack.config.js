const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
//const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

const config = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};

module.exports = (env, argv) => {
  
  if (argv.mode === 'production') {
    config.plugins.push(
      new HtmlCriticalPlugin({
        base: path.join(path.resolve(__dirname), 'dist/'),
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        width: 1024,
        height: 768,
        penthouse: {
          blockJSRequests: false,
        }
      })
    );
  }

  return config;
}