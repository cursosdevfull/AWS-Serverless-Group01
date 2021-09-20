export default {
  handler: `${__dirname
    .split(process.cwd())[1]
    .substring(1)
    .replace(/\\/g, '/')}/handler.main`,
  name: '${self:custom.channel.name}-${self:provider.stage}-${self:custom.lambda.type}-list-medics',
  layers: ['${ssm:/group01/${self:provider.stage}/layer}'],
};
