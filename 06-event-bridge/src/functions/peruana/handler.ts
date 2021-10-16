import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const peruana = async (event) => {
  console.log(event);
  return formatJSONResponse(event);
};

export const main = middyfy(peruana);
