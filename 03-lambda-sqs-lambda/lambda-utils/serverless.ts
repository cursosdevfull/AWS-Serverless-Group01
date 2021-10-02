import type { AWS } from '@serverless/typescript';

import sentEmail from '@functions/sentEmail';

const serverlessConfiguration: AWS = {
  service: 'lambdautils',
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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'ses:SendEmail',
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: 's3:GetObject',
            Resource: 'arn:aws:s3:::cursobucket/*',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { sentEmail },
};

module.exports = serverlessConfiguration;
