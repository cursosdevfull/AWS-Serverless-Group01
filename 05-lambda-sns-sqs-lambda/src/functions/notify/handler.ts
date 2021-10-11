import * as aws from 'aws-sdk';
import { middyfy } from '@libs/lambda';

const sns = new aws.SNS();

const notify = async (event) => {
  const { subject, recipient, body } = event.body;
  console.log({
    Message: JSON.stringify({ subject, recipient, body }),
    TopicArn: process.env.SNS_PUBLISH,
  });
  await sns
    .publish({
      Message: JSON.stringify({ subject, recipient, body }),
      TopicArn: process.env.SNS_PUBLISH,
    })
    .promise();
  console.log('Mensaje enviado', { subject, recipient, body });
};

export const main = middyfy(notify);
