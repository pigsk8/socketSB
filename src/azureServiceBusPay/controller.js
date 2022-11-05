const logger = require('../config/logger.config.js')
const socketIO = require("../SocketIO")

/**
 * This is the uuidSocket of last payment request over service bus
 */
let lastUuidSocket = ""

const errorHandler = async (error) => {
    logger.error("error proccessing payment_rs")
    console.log(error)
    //informar al front
}

module.exports = {
    /**Receive payment data. Then, create a payment without cvv */
    messageHandler: async (messageReceived) => {
        try {

            //log received message
            logger.info(`Received message (payment_rs_s1): ${messageReceived.body}`)
            messageReceived = JSON.parse(messageReceived.body)

            /** Get data  */
            let {
                uuidSocket = ""
            } = messageReceived

            lastUuidSocket = uuidSocket //set last uuidSocket

            //enviar al front
            const io = socketIO.getInstance()
            io.to(lastUuidSocket).emit('payment_rs', messageReceived.data);
            logger.info(`message sent to payment_rs socketId ${lastUuidSocket}`)

        } catch (error) {
            errorHandler(error)
        }
    },
    errorHandler
}

