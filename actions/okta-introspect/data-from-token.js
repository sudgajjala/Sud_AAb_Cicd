const { Core } = require('@adobe/aio-sdk')
const axios = require('axios');
const qs = require('qs');

async function getDataFromToken(params) {
    const logger = Core.Logger('okta-introspect', { level: params.LOG_LEVEL || 'info' });

    let data = qs.stringify({
        'token': params.token,
        'token_type_hint': 'access_token',
        'client_id': params.OKTA_CLIENT_ID,
        'client_secret': params.OKTA_CLIENT_SECRET
    });
    let config = {
        method: 'post',
        url: params.OKTA_DEV_URL + '/oauth2/default/v1/introspect',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    result = await axios.request(config);
    logger.info(result);
    if (result.status === 200) {
        return result.data;
    } else {
        throw new Error('Error in the Axiom Call');
    }

}

module.exports = { getDataFromToken }