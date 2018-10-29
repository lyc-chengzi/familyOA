/**
 * Created by liuyc14 on 2018/10/23.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

let baseConfig = require('../webpack.common');

//baseConfig.plugins.push(new HtmlWebpackPlugin({title: 'familyOA 家庭管理系统'}));
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const config = Object.assign(baseConfig, {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist/assets',
        hot: true
    }
});

const port = 5000;

const serverOption = {
    contentBase: './dist/assets',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, serverOption);

const compiler = webpack(config);
const server = new webpackDevServer(compiler, serverOption);

server.listen(port, serverOption.host, () => {
    console.log(`dev server listening on port ${port}`);
});