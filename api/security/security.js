module.exports= function(app,conn,uuid){
    var query = require('../dao/query.js')(conn);

    app.post('/login',function(req,res){
        query.getUserByName(req.body.name).then(function(data){
            query.getUserByNameAndPassword(req.body.name,req.body.password).then(function(user){
                res.status(200).send({id:user.id,name:user.name});
            },function(){
                res.status(400).send({errorMsg:'密码错误'});
            })
        },function(){
            res.status(400).send({errorMsg:'用户名没找到.'});
        });
    });

    app.post('/register',function(req, res){
        query.getUserByName(req.body.name).then(function(data){
            res.status(400).send({errorMsg:'用户已经存在.'});
        },function(){
            query.createUser(uuid(),req.body.name,req.body.password).then(function(user){
                res.status(200).send({id:user.id,name:user.name});
            },function(){
                res.status(400).send({errorMsg:'注冊失败，请重新注册。'});
            })
        });
    });

};
