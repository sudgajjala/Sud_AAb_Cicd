const fetch = require('node-fetch');
const { Core } = require('@adobe/aio-sdk');
/**
 * Fetch product data from external API
 * @returns {Promise<object>} The JSON content from the API
 * @throws {Error} If the fetch fails or the response is not ok
 */
async function fetchProduct(params) {
    const logger = Core.Logger('single-sync', { level: params.LOG_LEVEL || 'info' });
    logger.info('##### Inside Fetch Product ####');
    const apiEndpoint = params.EXTERNAL_API_ENDPOINT+"/"+params.id
    logger.info(apiEndpoint);
    const res = await fetch(apiEndpoint);
    if (!res.ok) {
        throw new Error(`Request to ${apiEndpoint} failed with status code ${res.status}`);
    }
    return await res.json();
}

module.exports = { fetchProduct }
