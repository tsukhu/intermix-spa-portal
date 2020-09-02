const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'intermix',
    projectName: 'login',
    webpackConfigEnv,
  })

    const intermixExternals = {
    externals: [/^@intermix\/.+$/, "i18next", "react-i18next"],
  };

  return webpackMerge.smart(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
      ],
    },
    devServer: {
      ...defaultConfig.devServer,
      port: 8008,
    },
  })
}