const path = require('path');

const production = {
  entry: ['./src/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'selectit.js',
    library: 'SelectIt',
    libraryTarget: 'window',
    libraryExport: 'default',
    globalObject: 'window',
  },
};

const docs = {
  mode: 'development',
  output : {
    path: path.resolve(__dirname, "docs"),
    filename: 'selectit.js',
    library: 'SelectIt',
    libraryTarget: 'window',
    libraryExport: 'default',
    globalObject: 'window',

  }
}
module.exports = [production, docs];
