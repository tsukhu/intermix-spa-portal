const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'intermix',
    projectName: 'notfound',
    webpackConfigEnv,
  });

  const intermixExternals = {
    externals: [/^@intermix\/?.*$/],
  };

  return webpackMerge.smart(defaultConfig, intermixExternals, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      ...defaultConfig.devServer,
      port: 8003,
    },
  });
};
