import { middyfy } from '@libs/lambda';
import * as jwt from 'jsonwebtoken';

const clients = async (event) => {
  const payload = event.body;

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken,
    }),
  };
};

export const main = middyfy(clients);
