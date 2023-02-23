/** @format */

import type { Configuration } from 'webpack'

import { rules } from './webpack.rules'
import { plugins } from './webpack.plugins'

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@root': '../../',
      '@common': '../common/src',
      '@chrome': '../chrome/src',
      '@electron': './src',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
}
