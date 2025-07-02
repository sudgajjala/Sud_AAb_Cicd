const { Core } = require('@adobe/aio-sdk');
const { getClient } = require('../oauth1a')

async function getToken(params) {
    const logger = Core.Logger('octa-auth', { level: params.LOG_LEVEL || 'info' });
    const client = getClient(getParams(params), logger);
    const token = await client.post(
        'integration/customer/token',
        JSON.stringify({ "username":params.email, "password": params.password }),
        '',
        { 'Content-Type': 'application/json' }
    )

    return token
}

function getParams(params) {
    return {
        params: {
            COMMERCE_CONSUMER_KEY: params.COMMERCE_CONSUMER_KEY,
            COMMERCE_CONSUMER_SECRET: params.COMMERCE_CONSUMER_SECRET,
            COMMERCE_ACCESS_TOKEN: params.COMMERCE_ACCESS_TOKEN,
            COMMERCE_ACCESS_TOKEN_SECRET: params.COMMERCE_ACCESS_TOKEN_SECRET
        },
        "url": params.COMMERCE_BASE_URL
    }
}
module.exports = {
    getToken
}