import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';
import * as velocityjs from 'velocityjs';

const ses = new aws.SES({ region: 'us-east-2' });
const s3 = new aws.S3();
const paramsFile = { Bucket: 'cursobucket', Key: 'index.html' };

const sentEmail = async (event) => {
  const { subject, recipient, body } = JSON.parse(event.Records[0].body);
  const data = await s3.getObject(paramsFile).promise();
  let bodyHtml = data.Body.toString('utf-8');
  console.log('antes', bodyHtml);
  bodyHtml = velocityjs.render(bodyHtml, { recipient });
  console.log({ recipient });
  console.log('después', bodyHtml);

  const params = {
    Source: 'sergiohidalgocaceres@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Html: {
          Data: bodyHtml,
        },
        /*Text: {
          Data: body,
        },*/
      },
      Subject: {
        Data: subject,
      },
    },
  };

  await ses.sendEmail(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Mensaje enviado',
      input: JSON.stringify({ subject, recipient, body }),
    }),
  };
};

export const main = middyfy(sentEmail);
