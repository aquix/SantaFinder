'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    module: {
        rules: [{
            use: [
                {
                    loader: 'raw-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ],
            test: /\.scss$/,
            exclude: /node_modules/
        }],

        noParse: [
            /google-libphonenumber\/dist/
        ]
    },

    devtool: 'source-map',

    devServer: {
        port: 9000,
        headers: { "Access-Control-Allow-Origin": "*" },
        contentBase: path.join(__dirname, '..', 'dist'),
        historyApiFallback: true,
        inline: true,
        hot: true,

    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        alias: {
            '@angular/common' : '@angular/common/bundles/common.umd.js',
            '@angular/compiler' : '@angular/compiler/bundles/compiler.umd.js',
            '@angular/core' : '@angular/core/bundles/core.umd.js',
            '@angular/http' : '@angular/http/bundles/http.umd.js',
            '@angular/platform-browser' : '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic' : '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/router' : '@angular/router/bundles/router.umd.js',
            '@angular/router-deprecated' : '@angular/router-deprecated/bundles/router-deprecated.umd.js',
            '@angular/upgrade' : '@angular/upgrade/bundles/upgrade.umd.js'
        }
    }
});