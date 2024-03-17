const { merge } = require('webpack-merge');
const common = require("./webpack.config");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: 'bpmn-webpack.bundle.js',
    },
    devtool: 'source-map'
})