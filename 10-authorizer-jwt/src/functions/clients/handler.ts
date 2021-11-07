import { middyfy } from '@libs/lambda';

const clients = async () => {
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
  };
};

export const main = middyfy(clients);
