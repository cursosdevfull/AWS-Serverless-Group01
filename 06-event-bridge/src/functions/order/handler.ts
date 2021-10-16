import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as aws from 'aws-sdk';
const eventBridge = new aws.EventBridge();

import schema from './schema';

const order: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const detail = event.body;

  const params = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'OrderCreated',
        Source: 'OrderService',
      },
    ],
  };
  const response = await eventBridge.putEvents(params).promise();
  console.log('response', response);

  return formatJSONResponse(detail);
};

export const main = middyfy(order);
