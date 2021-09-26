export default {
  handler: `${__dirname
    .split(process.cwd())[1]
    .substring(1)
    .replace(/\\/g, '/')}/handler.main`,
  name: '${self:custom.channel.name}-${self:provider.stage}-${self:custom.lambda.type}-list-medics',
  // layers: ['arn:aws:lambda:us-east-2:282865065290:layer:baseLayer:1'],
  layers: ['${ssm:/group01/${self:provider.stage}/layer}'],
  events: [
    {
      http: {
        method: 'get',
        path: 'medics',
      },
    },
  ],
};
