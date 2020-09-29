const Regex = {
    styles:/\.scss$/,
    libStyles:/\.css$/,
    scripts: /\.(tsx|js|jsx|ts)$/,
    images: /\.(jpe?g|png|gif)$/i,
    fonts: /\.(woff|woff2|eot|ttf|svg)$/i,
    audio: /\.(mp3)$/i,
    document: /.*\.html$/,
    nodeModules: /node_modules/,
    excludeHTML: /(?![html])([a-z]+)\/?(\?(.+))?$/,
    tsScripts: /\.tsx?$/,

};

module.exports = Regex;
