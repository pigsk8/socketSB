const { ServiceBusClient } = require("@azure/service-bus")
const logger = require("../config/logger.config.js")

module.exports = class AzureServiceBusSender {
    constructor({ connectionString = "", topicName = "" }) {
        this.connectionString = connectionString
        this.topicName = topicName

        this.sbClient = null
        this.sender = null
    }

    /**
     * 
     * @param {*} message must be a string.
     */
    async sendMessage(message) {

        /**
         * Check type of message
         * if message is not a string, parse to string
         * 
            console.log(typeof ""); // 👉️ "string"
            console.log(typeof "hello"); // 👉️ "string"
            console.log(typeof "42"); // 👉️ "string"
            console.log(typeof function () {}); // 👉️ "function"
            console.log(typeof null); // 👉️ "object"
            console.log(typeof []); // 👉️ "object"
            console.log(typeof {}); // 👉️ "object"
            console.log(typeof 0); // 👉️ "number"
         */
        let messageVarType = typeof message

        if (!message) throw new Error("Message is empty") //Null, undefined or empty string 

        else if (messageVarType === 'object') message = JSON.stringify(message) //An object diff to null

        else if (messageVarType === 'number') message = message.toString()

        else if (messageVarType !== 'string') throw new Error("Message must be a string")

        // create a Service Bus client using the connection string to the Service Bus namespace
        this.sbClient = new ServiceBusClient(this.connectionString)

        // createSender() can also be used to create a sender for a queue.
        this.sender = this.sbClient.createSender(this.topicName)

        try {

            //log before send message
            logger.info(
                `Sending message to topic ${this.topicName}.
                Message: ${message}`)

            // Set structure of message
            message = {
                body: message
            }

            // Send message
            await this.sender.sendMessages(message)

            // Close the sender
            await this.sender.close()
        }
        catch (err) {
            throw err
        }
        finally {
            await this.sbClient.close()
        }
    }

    getTopicName() {
        return this.topicName
    }
}
