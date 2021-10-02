import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import * as aws from 'aws-sdk';

const sqs = new aws.SQS();

const sender: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const queueUrl = process.env.SQS_QUEUE_URL;
  const { subject, recipient, body } = event.body;

  const message = {
    MessageBody: JSON.stringify({ subject, recipient, body }),
    QueueUrl: queueUrl,
  };

  await sqs.sendMessage(message).promise();

  return formatJSONResponse({
    message: JSON.stringify({ subject, recipient, body }),
  });
};

export const main = middyfy(sender);
