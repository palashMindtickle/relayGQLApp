/* eslint-disable  @typescript-eslint/no-var-requires */

const path = require('path');
const resolve = path.resolve;
const { Dir, Env } = require("./config/env.config");
const {
  ImagesLoaders,
  ScriptsLoaders,
  StylesLoaders,
  LibStylesLoaders,
  
} = require("./loaders");
const {
  ChunkCssPlugins,
  CreateTemplatePlugins,
  CompressPlugins,
  HandleErrorsPlugins,
  AddGlobalsPlugin,
  PerformancePlugins,
  CheckDuplicatePlugin,
  ProvidePlugin,
  CopyPersistedQueriesPlugin
} = require("./plugins");
console.log(Env);
const config = {};
config.mode = Env.NODE_ENV;
process.env.BABEL_ENV = Env.NODE_ENV === "development" ? "dev" : Env.NODE_ENV;

config.entry = {
  entry: path.join(__dirname, '../src', 'index.tsx'),
};

config.output = {
  publicPath: Env.PUBLIC_PATH,
  path: Dir.DIST,
  filename: "assets-ui/[name].js",
  chunkFilename: "assets-ui/[name].chunk.js",
  hotUpdateChunkFilename: "hot/hot-update.js",
  hotUpdateMainFilename: "hot/hot-update.json",
  filename: 'umd/bundle.js',
  libraryTarget: 'umd',
  library: ["relayGQLApp"]
};

config.devtool = "inline-source-map" ;
config.mode = Env.NODE_ENV;
config.stats = "normal";

// Don't attempt to continue if there are any errors.
config.bail = Env.NODE_ENV !== "development";
config.resolve = {
  extensions: [".ts", ".tsx", ".js", ".json"],
  symlinks: false,
  alias: {
    "@app": resolve(__dirname, Dir.APP),
    images: resolve(__dirname, Dir.MT_CORE + "/images"),
    fonts: resolve(__dirname, Dir.MINDTICKLE_COMMON + "/styles/fonts"),
    styles: resolve(__dirname, Dir.MINDTICKLE_COMMON + "/styles"),
  }
};
if (Env.NODE_ENV === "development") {
  config.devServer = {
    port: Env.SERVER_PORT,
    historyApiFallback: true,
    disableHostCheck: true,
    https: true
  };
}

config.module = {
  strictExportPresence: true, // makes missing exports an error instead of warning
  rules: [ ImagesLoaders,  ...ScriptsLoaders, StylesLoaders, LibStylesLoaders]
};

config.plugins = [...AddGlobalsPlugin, ...CreateTemplatePlugins, ...HandleErrorsPlugins, ...ProvidePlugin];

config.optimization = {
  runtimeChunk: true,
  splitChunks: {
    chunks: "all"
  }
};

if (Env.STYLE_CHUNKING || Env.CHUNKING) {
  config.plugins = config.plugins.concat(ChunkCssPlugins);
}

if (Env.SCRIPT_HASHING || Env.HASHING) {
  config.output.filename = "assets-ui/js/[name].[chunkhash].js";
  config.output.chunkFilename = "assets-ui/js/[name].[chunkhash].chunk.js";
}

if (Env.OPTIMISE || Env.SCRIPT_OPTIMISE) {
  config.plugins = config.plugins.concat([...PerformancePlugins, ...CheckDuplicatePlugin]);
}

if (Env.COMPRESS) {
  config.plugins = config.plugins.concat(CompressPlugins);
}

if(Env.QUERY_MINIFICATION) {
  config.plugins = config.plugins.concat(CopyPersistedQueriesPlugin);
}


console.log(config)

module.exports = config;
