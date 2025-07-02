const fetch = require('node-fetch');
const { Core } = require('@adobe/aio-sdk');
/**
 * Fetch product data from external API
 * @returns {Promise<object>} The JSON content from the API
 * @throws {Error} If the fetch fails or the response is not ok
 */
async function fetchProducts(params) {
    const logger = Core.Logger('sud-prod-sync', { level: params.LOG_LEVEL || 'info' });
    logger.info('##### Inside Fetch Products ####');
    const apiEndpoint = params.EXTERNAL_API_ENDPOINT;
    const res = await fetch(apiEndpoint);
    if (!res.ok) {
        throw new Error(`Request to ${apiEndpoint} failed with status code ${res.status}`);
    }
    return await res.json();
}

module.exports = { fetchProducts }
