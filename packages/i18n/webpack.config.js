const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');
module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'intermix',
    projectName: 'i18n',
    webpackConfigEnv,
  })

  const intermixExternals = {
    externals: [/^@intermix\/.+$/,"i18next","react-i18next", "angular-i18next","react"],
  };

  return webpackMerge.smart(defaultConfig, intermixExternals, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      ...defaultConfig.devServer,
      port: 8006,
    },
  })
}