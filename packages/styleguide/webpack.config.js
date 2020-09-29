const webpackMerge = require("webpack-merge");
const { GenerateSW } = require("workbox-webpack-plugin");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "intermix",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  const styleguideExternals = {
    externals: [/^@fortawesome\/fontawesome-free\/?.*$/],
  };

  return webpackMerge.smart(defaultConfig, styleguideExternals, {
    // modify the webpack config however you'd like to by adding to this object

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          ],
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
    plugins: [
      new GenerateSW({
        
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("/*intermix-styleguide.js$/"),
            handler: "StaleWhileRevalidate",
          },
        ],
      }),
    ],
    devServer: {
      ...defaultConfig.devServer,
      port: 8001,
    },
  });
};
