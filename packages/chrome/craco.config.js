/**
 * @see https://stackoverflow.com/questions/58323916/how-to-config-webpack-to-transpile-files-from-other-lerna-packages-ejected-from/58603207#58603207
 * @format
 */

const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader')

// Handle relative paths to sibling packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          // No "unexpected token" error importing components from these lerna siblings:
          resolvePackage('../common/src'),
        ],
      },
    },
  ],
  webpack: {
    alias: {
      '@root': path.resolve(__dirname, '../../'),
      '@common': path.resolve(__dirname, '../common/src'),
      '@chrome': path.resolve(__dirname, './src'),
      '@electron': path.resolve(__dirname, '../electron/src'),
    },
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      )

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
      return webpackConfig
    },
  },
}
