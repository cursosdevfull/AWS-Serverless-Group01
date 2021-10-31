import { middyfy } from '@libs/lambda';

const step02 = async (event) => {
  console.log(event);
  return event;
};

export const main = middyfy(step02);
