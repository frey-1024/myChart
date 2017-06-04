var Q = require('q');
module.exports = function (conn) {
    return {
        getUserInfoByUserId: function (userId) {
            var defer = Q.defer();
            conn.query("SELECT * FROM users WHERE id='" + userId + "'", function (error, userInfo, fields) {
                if (error) {
                    throw error;
                }
                if (userInfo && userInfo.length) {
                    defer.resolve(userInfo[0]);
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        },

        updateUserOnlineIds: function (userId, onlineIds) {
            var defer = Q.defer();
            conn.query("UPDATE users set onlineIds='" + onlineIds.toString() + "' WHERE id='" + userId + "'", function (error, results) {
                if (error) {
                    throw error;
                }
                if (results && results.affectedRows) {
                    defer.resolve({id: userId});
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        },

        getOnlineUsers: function () {
            var defer = Q.defer();
            conn.query("SELECT * FROM users WHERE ((onlineIds is not null) and  (onlineIds <>''))", function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    defer.resolve(results);
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        },

        setInputMessage: function (messageId, message) {
            var defer = Q.defer();
            conn.query('INSERT INTO chartContent SET ?', {
                id: messageId,
                content: message.content,
                userId: message.userId,
                userName: message.userName,
                createAt: new Date()
            }, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                if (results) {
                    defer.resolve({
                        id: messageId,
                        content: message.content,
                        userId: message.userId,
                        userName: message.userName
                    });
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        },
        
        deleteMessageByMessageId:function(messageId){
            var defer = Q.defer();
            conn.query("DELETE FROM chartContent WHERE id='"+messageId+"'",function(error,results,fields){
                if(error){
                    throw error;
                }
                if(results&&results.affectedRows){
                    defer.resolve({id:messageId});
                }else{
                    defer.reject();
                }
            });
            return defer.promise;
        }, 
        
        getMaxTenMessagesByCreateAt:function(createAt){
            var defer = Q.defer();
            conn.query("SELECT * FROM (SELECT * FROM chartContent WHERE createAt < '"+createAt+"' ORDER BY createAt DESC limit 0, 10 ) temp ORDER BY temp.createAt ASC",function(err,messages){
                if(err){
                    throw err;
                }
                if(messages){
                    defer.resolve(messages);
                }else{
                    defer.reject();
                }
               
            });
            return defer.promise;
        },
        
        getUserByName:function(userName){
            var defer = Q.defer();
            conn.query("SELECT * FROM users WHERE name='"+userName+"'",function(error,results,fields){
                if(error){
                    throw error;
                }
                if(results&&results.length){
                    defer.resolve({name:userName});
                }else{
                    defer.reject();
                }
            });
            return defer.promise;
        },
        
        getUserByNameAndPassword:function(userName,userPassword){
            var defer = Q.defer();
            conn.query("SELECT * FROM users WHERE name='"+userName+"'AND password='"+userPassword+"'",function(error,results,fields){
                if(error){
                    throw error;
                }
                if(results&&results.length){
                    defer.resolve(results[0]);
                }else{
                    defer.reject();
                }
            });
            return defer.promise;
        },
        
        createUser:function(userId,userName,userPassword){
            var defer = Q.defer();
            conn.query('INSERT INTO users SET ?', {id: userId,name:userName,password:userPassword}, function (error, results, fields) {
                if(error){
                    throw error;
                }
                if(results){
                    defer.resolve({id:userId,name:userName});
                }else{
                    defer.reject();
                }
            });
            return defer.promise;
        }
    };
};