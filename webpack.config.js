const path = require('path');

module.exports = {
  module: {
    rules: [{ test: /\.mp3$/, use: 'file-loader' }],
  },
};