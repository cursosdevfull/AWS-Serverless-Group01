import { middyfy } from '@libs/lambda';

const clients = async (event) => {
  const list = [
    { name: 'Client01' },
    { name: 'Client02' },
    { name: 'Client03' },
    { name: 'Client04' },
    { name: 'Client05' },
    { name: 'Client06' },
    { name: 'Client07' },
    { name: 'Client08' },
    { name: 'Client09' },
    { name: 'Client10' },
  ];
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: list,
    }),
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Origin': '*',
    },
  };
};

export const main = middyfy(clients);
