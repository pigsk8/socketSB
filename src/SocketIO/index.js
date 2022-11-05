let io = null;
module.exports = {
    //Initialize the socket server
    initialize: (httpServer) => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: '*',
            },
        });
        io.on('connection', (socket)=> {
            const socketId = socket.id
            console.log('client connected ', socketId)
            socket.on('disconnect', (reason) => {
                console.log('client disconnected with id = ', socketId, " reason ==> ", reason);
            });
        });
    },
    //return the io instance
    getInstance: () => {
        return io;
    }
}