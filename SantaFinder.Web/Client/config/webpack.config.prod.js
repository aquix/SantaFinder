'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            unsafe: true
        }),
    ],

    resolve: {
        alias: {
            '@angular/common' : '@angular/common/bundles/common.umd.min.js',
            '@angular/compiler' : '@angular/compiler/bundles/compiler.umd.min.js',
            '@angular/core' : '@angular/core/bundles/core.umd.min.js',
            '@angular/http' : '@angular/http/bundles/http.umd.min.js',
            '@angular/platform-browser' : '@angular/platform-browser/bundles/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic' : '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            '@angular/router' : '@angular/router/bundles/router.umd.min.js',
            '@angular/router-deprecated' : '@angular/router-deprecated/bundles/router-deprecated.umd.min.js',
            '@angular/upgrade' : '@angular/upgrade/bundles/upgrade.umd.min.js'
        }
    },
});