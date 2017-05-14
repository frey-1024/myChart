module.exports = function (app, conn, uuid) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    server.listen(81);

    var socketUtil = require('./socketUtil.js')(app, conn, uuid);

    io.on('connection', function (socket) {
        socket.on('userRefreshView', function (user) {
            socket.currentUserInfo = user;
            socketUtil.userRefresh(user, socket, io);
        });

        socket.on('serverMessageUpdate', function (message) {
            socketUtil.updateMessage(message, io);
        });

        socket.on('deleteMessage', function (data) {
            socket.broadcast.emit('deleteMessageListener', data);
        });

        socket.on('userLogin', function (data) {
            socket.currentUserInfo = data;
            socketUtil.updateOnlineUser(data, socket, io);
        });

        socket.on('userSignOut', function (data) {
            if (!data) {
                return;
            }
            socketUtil.signOutUser(data, socket);
        });
        socket.on('disconnect', function () {
            setTimeout(function () {
                socketUtil.signOutUser(socket.currentUserInfo, socket);
            }, 1000 * 30);
        });
    });
};