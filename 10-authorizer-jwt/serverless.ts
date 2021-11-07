import type { AWS } from '@serverless/typescript';

import clients from '@functions/clients';
import register from '@functions/register';
import authorizer from '@functions/authorizer';

const serverlessConfiguration: AWS = {
  service: 'auth-jwt',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['myApiKey'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      JWT_SECRET: 'keywordSecr3t2029',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { clients, register, authorizer },
};

module.exports = serverlessConfiguration;
