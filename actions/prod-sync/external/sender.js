
const fetch = require('node-fetch');
const { Core } = require('@adobe/aio-sdk');

/**
 * Sends transformed product data to the Magento API.
 *
 * @param {Array} transformedData - Array of transformed product objects.
 * @param {object} params - Parameters including Magento API URL and token.
 * @returns {Promise} Array of responses from Magento API.
 */
async function sendData(transformedData, params) {
    const logger = Core.Logger('sud-prod-sync', { level: params.LOG_LEVEL || 'info' });
    try {
        logger.info('Inside sendData Method');
        const req = exportProducts(transformedData, params);
        const results = await Promise.all(req);
        return results;
    } catch (error) {
        logger.error('Error sending data to Magento API:', error);
        throw error;
    }
}

function exportProducts(transformedData, params) {
    const MAGENTO_API_URL = params.MAGENTO_API_URL;
    const TOKEN = params.magento_token;
    const requests = transformedData.map(product => {
        return fetch(MAGENTO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(product)
        }).then(async res => {
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Magento API request failed with status ${res.status}: ${errorText}`);
            }
            return res.json();
        });
    });
    return requests;
}
module.exports = {
    sendData
}