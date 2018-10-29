/**
 * Created by liuyc14 on 2018/10/23.
 */
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

let baseConfig = require('./webpack.common');

const config = Object.assign(baseConfig, {
    mode: 'production'
});

module.exports = config;