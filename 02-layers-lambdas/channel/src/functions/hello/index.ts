import schema from './schema';

export default {
  handler: `${__dirname
    .split(process.cwd())[1]
    .substring(1)
    .replace(/\\/g, '/')}/handler.main`,
  layers: ['${ssm:/group01/${self:provider.stage}/layer}'],
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
