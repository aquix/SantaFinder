'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;


module.exports = {
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
                loader: 'ts-loader',
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common']
        }),
    ],
    resolve: {
        extensions: [ '', '.js', '.ts' ]
    }
};