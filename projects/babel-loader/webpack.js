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
        use: {
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
              ],
              "@babel/preset-typescript"
            ],
            plugins: [
              /**
               * because we aren't asking babel to transform the syntax here (as we are targeting latest browsers),
               * webpack 4 can't parse the syntax that's been passed from babel, so we actually need to transform it
               * even though the browser can read it
               */
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator"
            ]
          }
        }
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