import { middyfy } from '@libs/lambda';

const step04 = async (event) => {
  console.log(event.Records[0].body);
};

export const main = middyfy(step04);
