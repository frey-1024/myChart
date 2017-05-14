/**
 * Created by Administrator on 2017/4/3.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
// //定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录

module.exports = {
    entry:{
        app:APP_FILE,
        common: [
            "react",
            "react-dom",
            'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },
    output:{
        path: BUILD_PATH, //发布文件地址
        filename:'[name].js',
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }]
                })
                // exclude: /node_modules/,//去掉此处，因为需要Font Awesome
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [ {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },{loader:'sass-loader'}]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:[{
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:[{
                    loader: "file-loader"
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: 'body',
            hash: true
        }),
        //https://webpack.js.org/plugins/commons-chunk-plugin/#components/sidebar/sidebar.jsx
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "common.bundle.js"
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false,
            exclude: ["dist/index.html"]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
};