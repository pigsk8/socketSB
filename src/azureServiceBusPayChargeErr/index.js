const config = require('../config')
const AzureListener = require('../modelsAzureServiceBus/AzureServiceBusListener')
const { messageHandler, errorHandler } = require('./controller')
const topicName = config.AZURE_SB.PAYMENT_CHARGE.TOPIC_RECEIVE_ERROR
const subscriptionName = config.AZURE_SB.PAYMENT_CHARGE.SUBSCRIPTION_RECEIVE_ERROR
const connectionString = config.AZURE_SB.CONNECTION

let azureListener = new AzureListener({
    connectionString,
    topicName,
    subscriptionName,
    messageHandler,
    errorHandler
})

module.exports = azureListener