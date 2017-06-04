/**
 * Created by lg1 on 2017/1/24.
 */
var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'****',
    database:'mysql'
});
module.exports = connection;