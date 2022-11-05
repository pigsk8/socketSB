const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {

    const socketId = socket.id
    console.log('user connected ', socketId)
    socket.on('disconnect', () => {
        console.log('user disconnected', socketId);
    });

    socket.on('payment_rq', (msg) => {

        console.log('message: ' + msg + ' from '+socketId);
        messageReceived = JSON.parse(msg)
        msg.uuidSocket = socketId
        console.log(messageReceived)

        let azureServiceBusSender = new AzureServiceBusSender({
            connectionString: config.AZURE_SB.CONNECTION,
            topicName: 'payment_rq',
        })
        azureServiceBusSender.sendMessage(
            {
                data: messageReceived
            })

        //io.to(socketId).emit('payment_rs', msg);
    });

});

module.exports = io