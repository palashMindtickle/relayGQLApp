const webpackConfig = require('@mindtickle/frontend-configs/src/webpack');
const { DIRECTORY_KEYS, ENV_CONFIG_KEYS } = require('@mindtickle/frontend-configs/src/webpack/constants');
const path = require('path');
const webpack = require('webpack');
const c = webpackConfig({
  directoryMap: {
    [DIRECTORY_KEYS.ENTRY_POINT]: path.resolve(__dirname, '../', 'src', 'index'),
    [DIRECTORY_KEYS.OUTPUT]: path.resolve(__dirname, '../', 'dist'),
    [DIRECTORY_KEYS.APP_BASE]: path.resolve(__dirname, '../'),
    [DIRECTORY_KEYS.DOT_ENV_FILE]: path.resolve(__dirname, '../', '.env'),
    [DIRECTORY_KEYS.ESLINT_CONFIG]: path.resolve(__dirname, '../', 'eslint.config.js'),
    // [DIRECTORY_KEYS.BABEL_CONFIG_FILE]: path.resolve(__dirname, './', 'babel.config.js'),
    
  },
  webpackConfig: {
    pathsToTranspile: [],
  },
});
console.log(c, '-=-=-=-=-=-=-=-');

module.exports = c;
