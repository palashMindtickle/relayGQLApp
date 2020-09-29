const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EnvConfig = require("./config/env.config");
const Regex = require("./config/regex.config");
const { Env, Dir } = EnvConfig;

const GetName = {
  images(hashing) {
    return hashing ? `assets-ui/images/[name].[hash].[ext]` : `assets-ui/images/[name].[ext]`;
  },
  fonts(hashing) {
    return hashing ? `assets-ui/fonts/[name].[hash].[ext]` : `assets-ui/fonts/[name].[ext]`;
  },
  audio(hashing) {
    return hashing ? `assets-ui/audio/[name].[hash].[ext]` : `assets-ui/audio/[name].[ext]`;
  }
};

const optimiseImage = () => {
  return {
    loader: "image-webpack-loader",
    options: {
      gifsicle: {
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      pngquant: {
        quality: "65-90",
        speed: 4
      },
      mozjpeg: {
        progressive: true,
        quality: 65
      }
    }
  };
};

const loadImages = hashing => {
  return {
    loader: "url-loader",
    options: {
      limit: 10000,
      name: GetName.images(hashing)
    }
  };
};


// const lintJS = () => {
//   return { loader: "eslint-loader" };
// };

const transpileJS = () => {
  return { loader: "babel-loader?cacheDirectory=true", options: {
    plugins: ['relay'],
    "presets": [
      "react"
    ]
  } };
};

const transpileTS = () => ({
    loader: 'ts-loader',
  })

const minimizeCSS = () => {
  return {
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ["last 2 versions"]
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true
  };
};

const transformStyles = () => {
  return {
    loader: "sass-loader",
    options: {
      sourceMap: true
    }
  };
};

const processCSS = (optimise, hashing) => {
  let processing = {
    loader: "css-loader",
    options: {
      modules: true
    }
  };
  if (!hashing) processing.options.localIdentName = "[path][name]__[local]--[hash:base64:5]";
  if (optimise) processing.options.minimize = minimizeCSS();
  return processing;
};

const processLibCSS = optimise => {
  let processing = {
    loader: "css-loader",
    options: {}
  };
  if (optimise) processing.options.minimize = minimizeCSS();
  return processing;
};

const inlineCSS = () => {
  return { loader: "style-loader" };
};

const processImages = () => {
  const hashing = Env.IMAGE_HASHING || Env.HASHING;
  const optimise = Env.IMAGE_OPTIMISE || Env.OPTIMISE;
  let processing = {
    test: Regex.images,
    include: [Dir.APP, Dir.MAIN_APP, /mt-ui/],
    use: []
  };
  processing.use.push(loadImages(hashing));
  if (optimise) processing.use.push(optimiseImage());
  return processing;
};



const processScripts = () => {
  const jsProcessing = {
    test: Regex.scripts,
    include: [Dir.APP, Dir.MAIN_APP, Dir.MT_CORE, Dir.MINDTICKLE_COMMON, /mt-media-recorder\/src/,/mt-react/],
    use: [transpileJS()],
  };
  const tsProcessing = {
    test: Regex.tsScripts,
    include: [Dir.APP, Dir.MAIN_APP, Dir.MT_CORE, Dir.MINDTICKLE_COMMON, /mt-media-recorder\/src/,/mt-react/],
    use: [transpileTS()],
  };
  // processing.use.push(lintJS());
  // processing.use.push(transpileJS());
  return [tsProcessing, jsProcessing];
};

const processStyles = () => {
  const hashing = Env.STYLE_HASHING || Env.HASHING;
  const optimise = Env.STYLE_OPTIMISE || Env.OPTIMISE;
  const chunking = Env.STYLE_CHUNKING || Env.CHUNKING;
  let processing = {
    test: Regex.styles,
    include: [Dir.APP, /css/],
    use: []
  };
  if (chunking) {
    processing.use.push(MiniCssExtractPlugin.loader);
  } else {
    processing.use.push(inlineCSS());
  }
  processing.use.push(processCSS(optimise, hashing));
  processing.use.push(transformStyles());
  return processing;
};

const processLibStyles = () => {
  const optimise = Env.STYLE_OPTIMISE || Env.OPTIMISE;
  const chunking = Env.STYLE_CHUNKING || Env.CHUNKING;

  let processing = {
    test: Regex.libStyles,
    include: [/node_modules/,/css/],
    use: []
  };
  if (chunking) {
    processing.use.push(MiniCssExtractPlugin.loader);
  } else {
    processing.use.push(inlineCSS());
  }
  processing.use.push(processLibCSS(optimise));

  return processing;
};

module.exports = {
  ImagesLoaders: processImages(),
  ScriptsLoaders: processScripts(),
  StylesLoaders: processStyles(),
  LibStylesLoaders: processLibStyles(),
};
