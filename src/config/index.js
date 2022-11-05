require("dotenv").config();

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    CONTEXT_PATH: process.env.CONTEXT_PATH || '/api-payment-socket',
    TZ: process.env.TZ || 'America/Mexico_City',
    BASIC_AUTH: {
        USER:  process.env.BASIC_AUTH_USER || "",
        PASS: process.env.BASIC_AUTH_PASS || "",
    },
    AZURE_SB: {
            CONNECTION: process.env.AZURE_SB_CONNECTION || "Endpoint=sb://nelumbotest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=36e1pRJJJakUSAS9tmMggUtPFZB7rNrcPLbsSTtFI64=",
            PAYMENT: {
                TOPIC_SEND: "payment_rq",
                TOPIC_RECEIVE: "payment_rs",
                SUBSCRIPTION_RECEIVE: "payment_rs_s1",
                TOPIC_RECEIVE_ERROR: 'payment_err',
                SUBSCRIPTION_RECEIVE_ERROR: 'payment_err_s1'
            },
            CARDCHANGE: {
                TOPIC_SEND: "cardchange_rq",
                TOPIC_RECEIVE: "cardchange_rs",
                SUBSCRIPTION_RECEIVE: "cardchange_rs_s1",
                TOPIC_RECEIVE_ERROR: 'cardchange_err',
                SUBSCRIPTION_RECEIVE_ERROR: 'cardchange_err_s1'
            },
            PAYMENT_CHARGE: {
                TOPIC_SEND: "payment_charge_rq",
                TOPIC_RECEIVE: "payment_charge_rs",
                SUBSCRIPTION_RECEIVE: "payment_charge_rs_s1",
                TOPIC_RECEIVE_ERROR: 'payment_charge_err',
                SUBSCRIPTION_RECEIVE_ERROR: 'payment_charge_err_s1'
            },
    }
}
