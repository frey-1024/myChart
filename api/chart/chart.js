var moment = require('moment');

module.exports= function(app,conn,uuid){
    var query = require('../dao/query.js')(conn);
    app.delete('/delete/message/:messageId',function(req,res){
        query.deleteMessageByMessageId(req.params.messageId).then(function(message){
            res.send({messageId:message.id});
        },function(){
            res.status(400).send();
        });
    });
    app.post('/chart/messages',function(req, res){
        query.getMaxTenMessagesByCreateAt(moment(req.body.createAt).format('YYYY-MM-DD HH:mm:ss.SSS'))
            .then(function (messages) {
                res.send(messages);
            },function(){
                res.status(400).send();
            });
    });
    app.get('/online/users',function(req, res){
        query.getOnlineUsers().then(function(users){
            res.send(users);
        },function(){
            res.status(400).send();
        });
    });
};
