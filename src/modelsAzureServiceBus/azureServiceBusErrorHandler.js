const GeneralError = require('../errors/GeneralError')
const ErrorsContainer = require('../errors/ErrorsContainer')
const logger = require('../config/logger.config')

module.exports = {

    /**
     *
     * @param {*} error
     * @param {*} sender is an instance of modelsAzureServiceBus/AzureServiceBusSender.js
     */
    handleError: async ({ error, sender, uuidSocket = "", reference }) => {

        logger.error(`handleError`)
        console.log(error)

        let errorsContainer

        //Parse the error received into an instance of ErrorsContainer

        /**
         * The error is an instance of GeneralError
         */
        if (error.isCustomError) {
            /**The received error is a custom error
             * Needs wrap the unique error in a container before to send it to the client
            */
            errorsContainer = new ErrorsContainer()
            errorsContainer.add(error)
        }

        /**
        * The error is an instance of ErrorsContainer
        */
        else if (error.isErrorsContainer) {
            /**The received error is already an ErrorsContainer
            */
            errorsContainer = error
        }

        /**
         * The error is an Azure Service Bus Error
         */
        else if (error.error?.name === "ServiceBusError") {
            /**
             * The received error is an Azure Service Bus Error
            * Needs wrap the unique error in a container before to send it to the client
            */
            errorsContainer = new ErrorsContainer()
            errorsContainer.add(new GeneralError({ code: 'ServiceBusError', description: error.message, status: 500 }))
        }

        /**
         * Unknown Error
         */
        else {
            /**The received error is an Unknown error
             * Create a default error
             */
            error = new GeneralError({ traceId: null, description: error.message, status: 500 })
            errorsContainer = new ErrorsContainer()
            errorsContainer.add(error)
        }



        //At this point, the error received is already parsed to ErrorsContainer

        /**Error logger
         * Map each error, then log it
        */
        let errors = errorsContainer.errors
        errors.forEach(error => logger.error(error.description))

        /**Send an error response */
        try {
            /**
             * final response
             *
             * Usually send {uuidSocket:"...",errors:[...]}
             * But, if exists a reference, send {reference:"...",errors:[...]}
             */
            let errorResponse = reference ? { reference, errors } : { uuidSocket, errors }
            logger.info(`Sending error over service bus: ${JSON.stringify(errorResponse)}`)
            await sender.sendMessage(errorResponse)
            logger.info(`Good, error sent at topic ${sender.getTopicName()}`)
        } catch (error) {
            logger.error(`Error sending error at topic ${sender?.getTopicName()}
            ${error.message}
            ${JSON.stringify(error)}`)
        }
    }
}
