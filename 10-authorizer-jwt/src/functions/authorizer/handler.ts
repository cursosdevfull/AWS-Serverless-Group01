import { middyfy } from '@libs/lambda';
import * as jwt from 'jsonwebtoken';

const validateToken = (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

const generatePolicy = (principalId: string, effect: string, arn: string) => {
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: arn,
      },
    ],
  };

  const policy = {
    principalId,
    policyDocument,
  };

  return policy;
};

const authorizer = async (event) => {
  // const type = event.type
  const authorizationToken = event.authorizationToken;
  const methodArn = event.methodArn;

  try {
    await validateToken(authorizationToken);
    return generatePolicy('user', 'Allow', methodArn);
  } catch (error) {
    console.log(error);
    return generatePolicy('user', 'Deny', methodArn);
  }
};

export const main = middyfy(authorizer);
