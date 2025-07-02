const axios = require('axios');
const { Core } = require('@adobe/aio-sdk');

async function validateTotp(params) {
    const logger = Core.Logger('octa-auth', { level: params.LOG_LEVEL || 'info' });
    logger.info('##### validateTotp ####');
    let result;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: params.OKTA_DEV_URL + '/api/v1/authn/factors/' + params.factor_id + '/verify',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "stateToken": params.data.stateToken,
            "passCode": params.data.passCode
        })
    };
    result = await axios.request(config);
    logger.info(result);
    if (result.status === 200) {
        return result.data;
    } else {
        throw new Error('Error in the Axiom Call');
    }
}

module.exports = { validateTotp }