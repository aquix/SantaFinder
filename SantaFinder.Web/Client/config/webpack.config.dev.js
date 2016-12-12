'use strict';

const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    debug: true,
    devtool: 'source-map'
});