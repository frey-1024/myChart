function updateUserInlineIds(query, socket, io, userId, onlineIds, emitSelf) {
    query.updateUserOnlineIds(userId, onlineIds).then(function (userInfo) {
        if (emitSelf) {
            socket.broadcast.emit('addOnlineUser', userInfo);
            io.sockets.connected[socket.id].emit('onlineIdAddSuccess', {});
        } else {
            query.getOnlineUsers().then(function (users) {
                io.sockets.connected[socket.id].emit('getUsersFromServerByInit', users);
            });
        }
    });
}
function emitOnlineUsers(query, socket, io, userId, emitSelf) {
    query.getUserInfoByUserId(userId).then(function (userInfo) {
        var onlineIds = [];
        if (userInfo.onlineIds) {
            onlineIds = userInfo.onlineIds.split(',');
        }
        onlineIds.push(socket.id);
        updateUserInlineIds(query, socket, io, userId, onlineIds, emitSelf);
    });
}


module.exports = function (app, conn, uuid) {
    var query = require('../dao/query.js')(conn);
    return {
        userRefresh: function (currentUser, socket, io) {
            emitOnlineUsers(query, socket, io, currentUser.id);
        },
        updateMessage: function (message, io) {
            query.setInputMessage(uuid(), message).then(function (data) {
                io.emit('addMessage', {
                    id: data.id,
                    content: data.content,
                    userId: data.userId,
                    userName: data.userName
                });
            });
        },
        updateOnlineUser: function (currentUser, socket, io) {
            emitOnlineUsers(query, socket, io, currentUser.id, true);
        },
        signOutUser: function (currentUser, socket) {
            if (!currentUser) {
                return;
            }
            query.getUserInfoByUserId(currentUser.id).then(function (userInfo) {
                if (userInfo.onlineIds) {
                    var onlineIds = userInfo.onlineIds.split(',');
                    for (var i in onlineIds) {
                        if (onlineIds[i] == socket.id) {
                            onlineIds.splice(i, 1);
                            break;
                        }
                    }
                    query.updateUserOnlineIds(userInfo.id, onlineIds).then(function (data) {
                        socket.broadcast.emit('onlineUserLeaved', {id: data.id});
                    });
                }
            });
        }
    }
};