/**
 * Created by liuyc14 on 2018/10/23.
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './client/src/app.tsx'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: '!!pug-loader!./client/public/index.pug'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|git)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.(js|ts)x/,
                include: path.resolve(__dirname, 'client/src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false
                                }
                            ],
                            "@babel/proposal-class-properties",
                            "@babel/proposal-object-rest-spread",
                            ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css"}]
                        ]
                    }
                }]
            }
        ]
    }
};