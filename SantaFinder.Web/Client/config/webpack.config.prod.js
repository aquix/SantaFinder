'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPluginLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        {
            loader: 'to-string-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'sass-loader'
        }
    ]
});

module.exports = merge(commonConfig, {
     module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: extractTextPluginLoader
        }]
    },

     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            unsafe: true
        }),
        new ExtractTextPlugin('index.css')
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
    }
});