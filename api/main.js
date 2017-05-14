var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.listen(3000,function(){
   console.log('server successfully');
});

// server.listen(port);
//var jsonParser = bodyParser.json();
//app.disable('etag');
app.set('etag','strong');
// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header("Cache-Control", "no-cache");
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8000");//不用*是因为Access-Control-Allow-Credentials需要指定具体的
    //特别注意: 给一个带有withCredentials的请求发送响应的时候,服务器端必须指定允许请求的域名,
    // 不能使用'*'.上面这个例子中,如果响应头是这样的:Access-Control-Allow-Origin: * ,则响应会失败.
    // 在这个例子里,因为Access-Control-Allow-Origin的值是http://foo.example这个指定的请求域名,
    // 所以服务器端把带有凭证信息的内容返回给了客户端. 另外注意第22行,更多的cookie信息也被创建了.
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
     res.header("Access-Control-Allow-Credentials", "true");
     res.header("X-Powered-By",' 3.2.1');
     //if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
     next();
});

var conn= require('./dao/handleSql.js');
var uuid=require('uuid/v1');

require('./security/security.js')(app,conn,uuid);
require('./chart/chart.js')(app,conn,uuid);

require('./socket/socket.js')(app,conn,uuid);