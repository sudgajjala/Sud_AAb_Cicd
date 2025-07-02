const { Core } = require('@adobe/aio-sdk')
/**
 * Transforms product data received from external API into Adobe Commerce format.
 *
 * @param {Array} fetchedProducts - List of products from external API.
 * @param {object} params - Parameters, including optional LOG_LEVEL for logging.
 * @returns {Array} Array of transformed product objects.
 */
function transformData(fetchedProducts, params) {
  const logger = Core.Logger('sud-prod-sync', { level: params.LOG_LEVEL || 'info' });
  logger.info('Inside transformData Method');
  return fetchedProducts.map(product => ({
    product: {
      sku: `sku-${product.id}`,
      name: product.title,
      price: product.price,
      status: 1,
      type_id: 'simple',
      visibility: 4,
      attribute_set_id: 4,
      weight: 1,
      "custom_attributes": [
        {
          "attribute_code": "description",
          "value": product.description
        },
      ],
      "extension_attributes": {
        "stock_item": {
          "qty": 100,
          "is_in_stock": true
        }
      }

    }
  }
  ));
}

module.exports = {
  transformData
}