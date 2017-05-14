/**
 * Created by Administrator on 2017/4/3.
 */
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.hot');
var express = require('express');

var app = express();
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
   // historyApiFallback: true,
    inline: true,
    progress: true,
    reload:true
}));
app.use(require("webpack-hot-middleware")(compiler,{
    reload:true
}));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8000, function() {
    console.log('正常打开8000端口')
});