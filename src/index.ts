import { authenticate } from './lib';
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
