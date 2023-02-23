/** @format */

const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@root': path.resolve(__dirname, '../../'),
      '@common': path.resolve(__dirname, './src'),
      '@chrome': path.resolve(__dirname, '../chrome/src'),
      '@electron': path.resolve(__dirname, '../electron/src'),
    },
  },
}
