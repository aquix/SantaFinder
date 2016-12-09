'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;


module.exports = {
    debug: true,
    devtool: 'source-map',
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },

    module: {
        loaders: [
            {
                loader: 'raw',
                test: /\.html$/
            },
            {
                loader: 'ts',
                test: /\.ts$/,
                exclude: /node_modules/
            },
            {
                loader: 'style!css!sass',
                test: /\.scss$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        })
    ]
};