const { Core } = require('@adobe/aio-sdk')
/**
 * Transforms product data received from external API into Adobe Commerce format.
 *
 * @param {Array} fetchedProduct - List of products from external API.
 * @param {object} params - Parameters, including optional LOG_LEVEL for logging.
 * @returns {Array} Array of transformed product objects.
 */
function transformData(fetchedProduct, params) {
  const logger = Core.Logger('single-sync', { level: params.LOG_LEVEL || 'info' });
  logger.info('Inside transformData Method');
  return {
    "sku": `sku-${fetchedProduct.id}`,
    "name": fetchedProduct.title,
    "price": fetchedProduct.price,
    "description": fetchedProduct.description
  }

}

module.exports = {
  transformData
}