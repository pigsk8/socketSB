/** 
 * Init api rest
 */
const ApiRest = require("./src/ApiRest")
const api = new ApiRest()
api.listen()


/**
 * Init Socket
 */
const http = require('http');
const server = http.createServer(api.app);
const socketIO = require("./src/SocketIO")
socketIO.initialize(server)

//Socket-PaymentRq 
const SocketPaymentRq = require("./src/SocketIO/SocketPaymentRq")
const socketPaymentRq = new SocketPaymentRq(socketIO.getInstance())
socketPaymentRq.listen()

//Socket-PaymentChargeRq
const SocketPaymentChargeRq = require("./src/SocketIO/SocketPaymentChargeRq")
const socketPaymentChargeRq = new SocketPaymentChargeRq(socketIO.getInstance())
socketPaymentChargeRq.listen()

//Socket-CardchangeRq
const SocketCardchangeRq = require("./src/SocketIO/SocketCardchangeRq")
const socketCardchangeRq = new SocketCardchangeRq(socketIO.getInstance())
socketCardchangeRq.listen()

/**
 * Service Bus Listener Init
 */

//ServiceBusPay
const serviceBusPay = require('./src/azureServiceBusPay'),
    topicPay = serviceBusPay.getTopic(),
    subscriptionPay = serviceBusPay.getSubscription()
serviceBusPay.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicPay} and subscription ${subscriptionPay}`)
})
//ServiceBusPayErr
const serviceBusPayErr = require('./src/azureServiceBusPayErr'),
    topicPayErr = serviceBusPayErr.getTopic(),
    subscriptionPayErr = serviceBusPayErr.getSubscription()
serviceBusPayErr.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicPayErr} and subscription ${subscriptionPayErr}`)
})

//ServiceBusPayCharge
const serviceBusPayCharge = require('./src/azureServiceBusPayCharge'),
    topicPayCharge = serviceBusPayCharge.getTopic(),
    subscriptionPayCharge = serviceBusPayCharge.getSubscription()
serviceBusPayCharge.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicPayCharge} and subscription ${subscriptionPayCharge}`)
})
//ServiceBusPayChargeErr
const serviceBusPayChargeErr = require('./src/azureServiceBusPayChargeErr'),
    topicPayChargeErr = serviceBusPayChargeErr.getTopic(),
    subscriptionPayChargeErr = serviceBusPayChargeErr.getSubscription()
serviceBusPayChargeErr.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicPayChargeErr} and subscription ${subscriptionPayChargeErr}`)
})

//ServiceBusCard
const serviceBusCard = require('./src/azureServiceBusCard'),
    topicCard = serviceBusCard.getTopic(),
    subscriptionCard = serviceBusCard.getSubscription()
serviceBusCard.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicCard} and subscription ${subscriptionCard}`)
})
//ServiceBusCardErr
const serviceBusCardErr = require('./src/azureServiceBusCardErr'),
    topicCardErr = serviceBusCardErr.getTopic(),
    subscriptionCardErr = serviceBusCardErr.getSubscription()
serviceBusCardErr.listen().then(() => {
    console.log(`Azure Service Bus listening in topic ${topicCardErr} and subscription ${subscriptionCardErr}`)
})