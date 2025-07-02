const { Core } = require('@adobe/aio-sdk')
const { getDataFromToken } = require('./data-from-token')
//const { transformData } = require('./transformer')
const { errorResponse, successResponse } = require('../responses')

async function main(params) {
    const logger = Core.Logger('okta-introspect', { level: params.LOG_LEVEL || 'info' });
    try {
        const dataFromToken = await getDataFromToken(params);
        return successResponse('okta-introspect', dataFromToken);
    } catch (error) {
        logger.error('Error caught in main function:', error);
        return errorResponse(500, 'Server error', logger);
    }
}

exports.main = main