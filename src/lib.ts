require('dotenv').config({ silent: true });

import jwksClient from 'jwks-rsa';
import { decode, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import { APIGatewayProxyEvent } from 'aws-lambda';

const getPolicyDocument = (effect: any, resource: any) => {
    const policyDocument = {
        Version: '2012-10-17', // default version
        Statement: [{
            Action: 'execute-api:Invoke', // default action
            Effect: effect,
            Resource: resource,
        }]
    };
    return policyDocument;
}


// extract and return the Bearer Token from the Lambda event parameters
const getToken = (params: any) => {
    if (!params.type || params.type !== 'TOKEN') {
        throw new Error('Expected "event.type" parameter to have value "TOKEN"');
    }

    const tokenString = params.authorizationToken;
    if (!tokenString) {
        throw new Error('Expected "event.authorizationToken" parameter to be set');
    }

    const match = tokenString.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
        throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer .*"`);
    }
    return match[1];
}

const jwtOptions = {
    audience: process.env.AUDIENCE,
    issuer: process.env.TOKEN_ISSUER
};

export async function authenticate(params: any) {
    console.log(params);
    const token = getToken(params);

    const decoded = decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
        throw new Error('invalid token');
    }

    const getSigningKey = promisify(client.getSigningKey);
    const key = await getSigningKey(decoded.header.kid);
    const signingKey = key.getublicKey || key.rsaPublicKey;
    const decoded_1 = verify(token, signingKey, jwtOptions);
    return ({
        principalId: decoded_1.sub,
        policyDocument: getPolicyDocument('Allow', params.methodArn),
        context: { scope: decoded_1.scope }
    });
}

const client = jwksClient({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10, // Default value
    jwksUri: process.env.JWKS_URI || 'undifined'
});

export default authenticate;