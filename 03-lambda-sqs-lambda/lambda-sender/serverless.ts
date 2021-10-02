import type { AWS } from '@serverless/typescript';

import sender from '@functions/sender';

const serverlessConfiguration: AWS = {
  service: 'lambdasqs',
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
      SQS_QUEUE_URL: '${cf:lambdasqs-dev.SQSQueueUrl}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'sqs:SendMessage',
            Resource: ['${cf:lambdasqs-dev.SQSQueueArn}'],
          },
        ],
      },
    },
  },

  // import the function via paths
  functions: { sender },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'SQSQueue',
        },
      },
    },
    Outputs: {
      SQSQueueArn: {
        Value: { 'Fn::GetAtt': ['SQSQueue', 'Arn'] },
      },
      SQSQueueUrl: {
        Value: {
          Ref: 'SQSQueue',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
