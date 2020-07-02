const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options)

  singleSpaWebpackConfig.externals = [
    Object.assign({}, singleSpaWebpackConfig.externals, {
      "@intermix/store": "@intermix/store",
      "@intermix/i18n": "@intermix/i18n",
      "angular-i18next": "angular-i18next",
      "rxjs": "rxjs"
    }),
  ];

  // console.log(singleSpaWebpackConfig.externals);
  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig
}