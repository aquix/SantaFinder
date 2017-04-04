'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                use: 'raw-loader',
                test: /\.html$/
            },
            {
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: 'angular2-template-loader'
                    },
                    {
                        loader: 'angular-router-loader'
                    }
                ],
                test: /\.ts$/,
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
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return isExternal(module);
            }
        }),
        new CopyWebpackPlugin([{
            from: './src/static'
        }]),
        // Need to hack Angular dynamic imports
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)bundles/,
        __dirname
        ),
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
};

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}