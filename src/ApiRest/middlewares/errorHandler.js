const logger = require('../../config/logger.config')
const ErrorResponse = require('../../errors/ErrorResponse')

module.exports = (error, req, res, next) => {

    logger.error(error)

    if (error.isErrorsContainer) {
        res.status(error.status).json({
            'errors': new ErrorResponse({
                code: error.code,
                description: error.message,
                fields: error.fields
            }).toJson()
        })
    } else {
        /**The received error is an Unknown error
         * Create a default error
         */
        res.status(500).json({
            'errors': new ErrorResponse({
                code: '500',
                description: error.message,
                fields: []
            }).toJson()
        })
    }
}

