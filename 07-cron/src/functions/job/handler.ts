import { middyfy } from '@libs/lambda';

const job = async (event) => {
  console.log(event);
  console.log('Listo: ' + new Date().toISOString());
};

export const main = middyfy(job);
