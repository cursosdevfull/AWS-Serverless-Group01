import { middyfy } from '@libs/lambda';

const step01 = async (event) => {
  console.log(event);
  return event.number;
};

export const main = middyfy(step01);
