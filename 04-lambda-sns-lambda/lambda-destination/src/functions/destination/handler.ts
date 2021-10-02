import { middyfy } from '@libs/lambda';

const destination = async (event) => {
  console.log(event);
  return { statusCode: 200, body: JSON.stringify(event) };
};

export const main = middyfy(destination);
