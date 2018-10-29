/**
 * Created by liuyc14 on 2018/10/23.
 */
const express = require('express');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();

let baseConfig = require('../webpack.common');

baseConfig.plugins.push(new HtmlWebpackPlugin({title: 'familyOA 家庭管理系统'}));
const config = Object.assign(baseConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true
    }
});

const port = 3000;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
}));

app.listen(port, () => {
    console.log(`local server is started! port is ${port}`);
});