import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'cursosdevbucket',
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: 'textos/',
          },
          {
            suffix: '.txt',
          },
        ],
      },
    },
  ],
};
