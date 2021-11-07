import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'clients',
        authorizer: 'aws_iam',
        cors: true,
      },
    },
  ],
};
