import type { AWS } from '@serverless/typescript';

import { hello, list } from './src/functions';

const serverlessConfiguration: AWS = {
  service:
    '${self:custom.channel.name}-medics-${self:custom.lambda.type}-${self:provider.stage}',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: false,
    },
    channel: {
      name: 'group01',
    },
    lambda: { type: 'channel' },
    regionName: {
      dev: 'us-east-2',
      qa: 'us-east-2',
      prod: 'us-east-1',
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-2',
    // region: '${self:custom.regionName.${self:provider.stage}}',
    stage: "${opt:stage,'dev'}",
    apiGateway: {
      restApiId: '${ssm:/group01/${self:provider.stage}/apigateway/restapiid}',
      restApiRootResourceId:
        '${ssm:/group01/${self:provider.stage}/apigateway/restapirootresourceid}',
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: 'group01-${self:provider.stage}-lambda-${self:custom.lambda.type}',
      serverSideEncryption: 'AES256',
    },
    iam: {
      role: 'arn:aws:iam::282865065290:role/aws-group-role-lambdas-${self:custom.lambda.type}-${self:provider.stage}',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { hello, list },
};

module.exports = serverlessConfiguration;
