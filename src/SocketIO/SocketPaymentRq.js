const config = require('../config')
const logger = require("../config/logger.config.js")

const topicName = config.AZURE_SB.PAYMENT.TOPIC_SEND
const connectionString = config.AZURE_SB.CONNECTION
const AzureServiceBusSender = require('../modelsAzureServiceBus/AzureServiceBusSender')

module.exports = class SocketPaymentRq {
    constructor(io) {
        this.io = io
    }

    listen() {
        this.io.on('connection', (socket) => {

            const socketId = socket.id

            socket.on('payment_rq', (msg) => {
                logger.info(`message receive socket payment_rq ${msg} from ${socketId}`)
                let messageReceived = JSON.parse(msg)
                messageReceived.uuidSocket = socketId

                let azureServiceBusSender = new AzureServiceBusSender({
                    connectionString: connectionString,
                    topicName: topicName,
                })
                azureServiceBusSender.sendMessage(messageReceived)

            })

        })
    }

}