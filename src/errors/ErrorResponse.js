module.exports = class ErrorResponse extends Error {
    constructor(args) {

        let { code, description = "Unknown error", fields = [] } = args || {}

        super(description)

        /**
         * If the code is provided, use that code
         * 
         * If the code is not provided, but the status is provided,
         * use the status to generate the code
         * 
         * If the code is not provided, but the status is not provided too,
         * use the default status
         */
        if (code) this.code = code
        else if (!code) this.code = '400' //parse number to string

        this.fields = fields
        this.description = description

    }

    toJson() {
        return {
            code: this.code,
            description: this.description,
            fields: this.fields
        }
    }

}