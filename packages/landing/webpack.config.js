const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "intermix",
    projectName: "landing",
    webpackConfigEnv,
    argv
  });

  const intermixExternals = {
    externals: ["alpinejs"],
  };
  return webpackMerge.smart(defaultConfig, intermixExternals, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      ...defaultConfig.devServer,
      port: 8007,
    },
  });
};
