const { ServiceBusClient } = require("@azure/service-bus")

module.exports = class AzureServiceBusListener {
    constructor({ connectionString = "", topicName = "", subscriptionName = "", messageHandler, errorHandler }) {
        this.connectionString = connectionString
        this.topicName = topicName
        this.subscriptionName = subscriptionName
        this.messageHandler = messageHandler
        this.errorHandler = errorHandler

        this.sbClient = null
        this.receiver = null
    }

    async close() {
        if (receiver && sbClient) {
            await receiver.close()
            await sbClient.close()
        }
    }

    getTopic() {
        return this.topicName
    }
    getSubscription() {
        return this.subscriptionName
    }

    async listen() {
        // create a Service Bus client using the connection string to the Service Bus namespace
        this.sbClient = new ServiceBusClient(this.connectionString)

        // createReceiver() can also be used to create a receiver for a queue.
        this.receiver = this.sbClient.createReceiver(this.topicName, this.subscriptionName)

        // subscribe and specify the message and error handlers
        this.receiver.subscribe({
            processMessage: this.messageHandler,
            processError: this.errorHandler
        })
    }

}


