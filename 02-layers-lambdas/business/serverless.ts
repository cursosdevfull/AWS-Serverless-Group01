import type { AWS } from '@serverless/typescript';

import { list } from './src/functions';

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
    lambda: { type: 'business' },
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
    stage: "${opt:stage,'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    deploymentBucket: {
      name: 'group01-${self:provider.stage}-lambda-${self:custom.lambda.type}',
      serverSideEncryption: 'AES256',
    },
    iam: {
      role: 'arn:aws:iam::282865065290:role/aws-group-role-lambdas-${self:custom.lambda.type}-${self:provider.stage}',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { list },
};

module.exports = serverlessConfiguration;
