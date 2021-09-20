import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

const lambda = new aws.Lambda();

const list = async () => {
  const results = await lambda
    .invoke({
      InvocationType: 'RequestResponse',
      FunctionName: 'group01-dev-business-list-medics',
    })
    .promise();

  return formatJSONResponse({
    results,
  });
};

export const main = middyfy(list);
