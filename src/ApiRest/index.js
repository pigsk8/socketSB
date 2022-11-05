const express = require("express")
const basicAuth = require('express-basic-auth')

const config = require('../config')
const ErrorResponse = require("../errors/ErrorResponse")

module.exports = class ApiRest {
    constructor() {
        this.app = express()

        this.basicAuthConf()

        this.middleware()

        //this.routes()

        this.errors()

        this.port = config.SERVER_PORT
    }

    middleware() {
        // parse json request body
        this.app.use(express.json())
        // parse urlencoded request body
        this.app.use(express.urlencoded({
            extended: true
        }))

        /**
         * XSS
         * 
         * Sanitize request data
         * Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist.
         * xss is a module used to filter input from users to prevent XSS attacks
         */
        const xss = require('xss-clean')
        this.app.use(xss())

        /**
         * Cors
         * 
         * CORS is a node.js package for providing a Connect/Express middleware that 
         * can be used to enable CORS with various options.
         */
        const cors = require('cors')
        this.app.use(cors({
            origin: '*'
        }))

        /**
         * Helmet
         * 
         * Helmet helps you secure your Express apps by setting various HTTP headers. 
         * It's not a silver bullet, but it can help!
         */
        const helmet = require('helmet')
        this.app.use(helmet())
    }

    routes() {
        const routes = require('./routes')
        const contextPath = config.CONTEXT_PATH
        this.app.use(contextPath, routes)

        //The 404 Route (ALWAYS Keep this as the last route)
        this.app.use('*', function (req, res) {
            res.status(404)
            res.json({
                'errors': new ErrorResponse({
                    code: '404',
                    description: 'Not Found',
                    fields: ['routes']
                }).toJson()
            })
        })
    }

    errors() {
        const errorHandler = require('./middlewares/errorHandler')
        this.app.use(errorHandler)
    }

    listen() {
        const logger = require('../config/logger.config')
        this.app.listen(this.port, logger.info(`***ApiRest Listening on port ${this.port}`))
    }

    basicAuthConf() {
        this.app.use(basicAuth({
            authorizer: this.myAuthorizer
        }))
    }

    myAuthorizer(username, password) {
        const userMatches = basicAuth.safeCompare(username, config.BASIC_AUTH.USER)
        const passwordMatches = basicAuth.safeCompare(password, config.BASIC_AUTH.PASS)
        return userMatches & passwordMatches
    }
}