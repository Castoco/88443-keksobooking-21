const path = require("path")

module.exports = {
  entry: [
    "./js/filterMap.js",
    "./js/moving.js",
    "./js/main.js",
    "./js/dataServer.js",
    "./js/util.js",
    "./js/data.js",
    "./js/card.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false

};
