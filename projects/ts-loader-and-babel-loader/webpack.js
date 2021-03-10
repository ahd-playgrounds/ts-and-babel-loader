const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = __dirname;

module.exports = (_, options = {}) => ({
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"]
    // alias: {
    //   ...shared,
    // },
  },
  entry: path.resolve(rootPath, "src", "App.tsx"),
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {
                  targets: "defaults",
                  useBuiltIns: "entry",
                  corejs: 3
                }],
                [
                  "@babel/preset-react",
                  {
                    development: options.mode === "development"
                  }
                ]
                // notice the lack of typescript plugin
              ],
              plugins: [
                // we don't need these because typescript will have removed them
                // "@babel/plugin-proposal-optional-chaining",
                // "@babel/plugin-proposal-nullish-coalescing-operator"
              ]
            }
          },
          {
            loader: "ts-loader"
          }
        ] // loaders seem to run bottom to top, same as babel presets
      }
    ]
  },
  devServer: {
    contentBase: path.join(rootPath, "build"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 4000,
    publicPath: "/"
  },
  output: {
    path: path.resolve(rootPath, "build"),
    filename: "js/[name].js",
    publicPath: "./"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "babel-loader",
      meta: {
        viewport: "width=device-width, initial-scale=1.0"
      }
    })
  ]
});