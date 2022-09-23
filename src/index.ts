import { authenticate } from './lib';
import AWSXRay from 'aws-xray-sdk-core';

const AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWSXRay.setContextMissingStrategy(() => { });
// const lambda = new AWS.Lambda();

let data: any;

// Lambda function index.handler - thin wrapper around lib.authenticate
module.exports.handler = async (event: any, context: any) => {
  try {
    data = await authenticate(event);
  }
  catch (err) {
    console.log(err);
    return context.fail("Unauthorized");
  }
  return data;
};
