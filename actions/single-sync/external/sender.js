
const { Core } = require('@adobe/aio-sdk');
const Openwhisk = require('../../openwhisk')

/**
 * Sends transformed product data to the Magento API.
 *
 * @param {Array} transformedData - Array of transformed product objects.
 * @param {object} params - Parameters including Magento API URL and token.
 * @returns {Promise} Array of responses from Magento API.
 */
async function sendData(transformedData, params) {
    const logger = Core.Logger('single-sync', { level: params.LOG_LEVEL || 'info' });
    try {
        logger.info('Inside sendData Method');
        const results = exportProduct(transformedData, params);
        
        return results;
    } catch (error) {
        logger.error('Error sending data to Magento API:', error);
        throw error;
    }
}

async function exportProduct(transformedData, params) {
    const logger = Core.Logger('single-sync', { level: params.LOG_LEVEL || 'info' });
    logger.info('Inside exportProduct Internal Method');
    const openwhiskClient = new Openwhisk();
    const result = await openwhiskClient.invokeAction(
        'product-backoffice/created',
        transformedData
    )
    const statusCode = result?.response?.result?.statusCode
    return {
        statusCode: statusCode,
        body: result
    }
}

module.exports = {
    sendData
}