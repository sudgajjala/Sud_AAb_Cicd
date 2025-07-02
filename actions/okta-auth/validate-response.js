const { Core } = require('@adobe/aio-sdk');
const schema = require('./schema.json');
const Ajv = require('ajv')
/**
 * Validates input data against a predefined JSON schema.
 *
 * @function
 * @param {Object} params - The data object to be validated.
 * @throws {Error} Throws an error if the data does not conform to the schema.
 * @returns {boolean} Returns `true` if the data is valid.
 */

function validateResponse(params) {
    const data = params
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const isValid = validate(data)
    if (!isValid) {
        throw new Error(`Data provided does not validate with the schema: ${JSON.stringify(data)}`)
    }
    return true
}

module.exports = {
    validateResponse
}