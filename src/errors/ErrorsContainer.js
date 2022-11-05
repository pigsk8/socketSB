module.exports = class ErrorsContainer extends Error {
    constructor(args) {

        let { status, code, description = "Unknown error", fields = [] } = args || {}

        super(description)

        this.status = status
        this.code = code
        this.fields = fields
        this.isErrorsContainer = true
    }

    add(field) {
        this.fields.push(field)
    }

    addJsonArray(fields) {
        fields.forEach(field => {
            this.fields.push(field)
        })
    }

    isEmpty() {
        return this.errors.length == 0
    }

    hasErrors() {
        return !this.isEmpty()
    }

    toJson() {
        return {
            status: this.status,
            code: this.code,
            fields: this.fields
        }
    }
}