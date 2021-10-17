import type { AWS } from '@serverless/typescript';

import eventos3 from '@functions/eventos3';

const serverlessConfiguration: AWS = {
  service: 's3eventbucket',
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
            Action: ['s3:GetObject'],
            Effect: 'Allow',
            Resource: 'arn:aws:s3:::cursosdevbucket/*',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { eventos3 },
};

module.exports = serverlessConfiguration;
