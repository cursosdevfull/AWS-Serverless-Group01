import type { AWS } from '@serverless/typescript';

import order from '@functions/order';
import peruana from '@functions/peruana';
import mexicana from '@functions/mexicana';

const serverlessConfiguration: AWS = {
  service: 'eventBrigde',
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
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    eventBridge: {
      useCloudFormation: true,
    },
    iam: {
      role: {
        name: 'eventBrigde',
        statements: [
          {
            Effect: 'Allow',
            Action: ['events:PutEvents'],
            Resource: ['*'],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { order, peruana, mexicana },
};

module.exports = serverlessConfiguration;
