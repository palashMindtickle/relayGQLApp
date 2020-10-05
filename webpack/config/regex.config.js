const Regex = {
    styles:/\.scss$/,
    libStyles:/\.css$/,
    scripts: /\.(js|jsx|tsx|ts)$/,
    images: /\.(jpe?g|png|gif)$/i,
    fonts: /\.(woff|woff2|eot|ttf|svg)$/i,
    audio: /\.(mp3)$/i,
    document: /.*\.html$/,
    nodeModules: /node_modules/,
    excludeHTML: /(?![html])([a-z]+)\/?(\?(.+))?$/,
    tsScripts: /\.(tsx|ts)?$/,

};

module.exports = Regex;
