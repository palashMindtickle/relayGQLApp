const webpackConfig = require('@mindtickle/frontend-configs/src/webpack');
const { DIRECTORY_KEYS } = require('@mindtickle/frontend-configs/src/webpack/constants');
const path = require('path');
const c =  webpackConfig({
  directoryMap: {
    [DIRECTORY_KEYS.ENTRY_POINT]: path.resolve(__dirname, '../', 'src', 'index'),
    [DIRECTORY_KEYS.OUTPUT]: path.resolve(__dirname, '../', 'dist'),
    [DIRECTORY_KEYS.APP_BASE]: path.resolve(__dirname, '../'),
    [DIRECTORY_KEYS.DOT_ENV_FILE]: path.resolve(__dirname, '../', '.env'),
  },
  webpackConfig: {
    pathsToTranspile: [
    ],
  },
});
// console.log(c.resolve, '---------------')
console.log(c.plugins, '---------------')
module.exports = c ;