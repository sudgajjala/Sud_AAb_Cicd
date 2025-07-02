const { Core } = require('@adobe/aio-sdk');
const { errorResponse, successResponse } = require('../responses');
const { validateTotp } = require('./validate-totp');
const {validateResponse} = require('./validate-response');
const { getToken } = require('./getToken');

async function main(params) {
    const logger = Core.Logger('octa-auth', { level: params.LOG_LEVEL || 'info' });
    try {
        let totpData = await validateTotp(params);
        //validateResponse(totpData)
        params.email = totpData._embedded.user.profile.login
        params.password = "admin@12345"
        const token = await getToken(params);
        return successResponse('customer-token', token);
    } catch (error) {
        logger.debug(error)
        return errorResponse(500, error.message);
    }
}



exports.main = main