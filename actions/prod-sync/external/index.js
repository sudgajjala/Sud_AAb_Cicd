const { Core } = require('@adobe/aio-sdk')
const { sendData } = require('./sender')
const { validateData } = require('./validator')
const { fetchProducts } = require('./fetchProducts')
const { transformData } = require('./transformer')
const { errorResponse, successResponse } = require('../../responses')
/**
 * Sync products from external API to Adobe Commerce.
 *
 * @param {object} params - Input parameters required for data fetching and sending.
 * @param {string} params.LOG_LEVEL - Optional log level ('info', 'debug', etc.).
 * @returns Response object containing status code and  response.
 */
async function main(params) {
    const logger = Core.Logger('sud-prod-sync', { level: params.LOG_LEVEL || 'info' });
    try {
        const fetchedProducts = await fetchProducts(params);
        logger.info('Data fetched successfully.');

        validateData(fetchedProducts);
        logger.info('Validation completed.');

        const transformedData = transformData(fetchedProducts, params);
        logger.info('Data transformation completed.');

        const magentoResponse = await sendData(transformedData, params);
        logger.info('Completed sending and syncing products.');
        logger.debug(magentoResponse);
        return successResponse('sud-prod-sync', magentoResponse);
    } catch (error) {
        logger.error('Error caught in main function:', error);
        return errorResponse(500, 'Server error', logger);
    }
}

exports.main = main