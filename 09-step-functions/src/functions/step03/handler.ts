import { middyfy } from '@libs/lambda';

const step03 = async (event) => {
  console.log(event);
  return event.number;
};

export const main = middyfy(step03);
