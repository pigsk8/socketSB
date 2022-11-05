const logger = require('../config/logger.config.js')
const socketIO = require("../SocketIO")
/**
 * This is the uuidSocket of last cardchange_err request over service bus
 */
let lastUuidSocket = ""

const errorHandler = async (error) => {
    logger.error("error proccessing cardchange_err")
    console.log(error)
    //informar al front
}

module.exports = {
    messageHandler: async (messageReceived) => {
        try {

            //log received message
            logger.info(`Received message (cardchange_err_s1): ${messageReceived.body}`)
            messageReceived = JSON.parse(messageReceived.body)

            /** Get data  */
            let {
                uuidSocket = ""
            } = messageReceived

            lastUuidSocket = uuidSocket //set last uuidSocket

            //enviar al front
            const io = socketIO.getInstance()
            io.to(lastUuidSocket).emit('cardchange_err', messageReceived.errors);
            logger.info(`message sent to cardchange_err socketId ${lastUuidSocket}`)
            

        } catch (error) {
            errorHandler(error)
        }
    },
    errorHandler
}

