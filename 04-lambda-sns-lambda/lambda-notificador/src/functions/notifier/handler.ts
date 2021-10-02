import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';
import schema from './schema';

const sns = new aws.SNS();

const notifier: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { name, email, subject } = event.body;
  const message = {
    Message: JSON.stringify({ name, email, subject }),
    TopicArn: process.env.SNS_TOPIC_ARN,
  };
  await sns.publish(message).promise();

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(notifier);
