/**
 * Created by Administrator on 2017/4/3.
 */
var path = require('path');
var webpack = require('webpack');

// //定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '/dist'); //发布文件所存放的目录

module.exports = {
    devtool: 'inline-source-map',
    entry:{
        app:[
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            APP_FILE
        ]
    },
    output:{
        path: BUILD_PATH, //发布文件地址
        filename:'[name].js',
        publicPath: '/dist'
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
               // exclude: /node_modules/,//去掉此处，因为需要Font Awesome
                use: [
                    { loader: 'style-loader'},
                    {
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
                    }
                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader'},
                    {
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
                'NODE_ENV': JSON.stringify('development')
            },
            BASE_URL: JSON.stringify('http://localhost:9009'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)

        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
};