import type { AWS } from '@serverless/typescript';
import destination from '@functions/destination';
import notify from '@functions/notify';

const serverlessConfiguration: AWS = {
  service: 'snssqslambdav2',
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
      SNS_PUBLISH: '${cf:snssqslambdav2-dev.SNSSQSArn}',
      SNS_TOPIC_NAME: '${cf:snssqslambdav2-dev.SNSSQSTopicName}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'SNS:Publish',
            Resource: ['${cf:snssqslambdav2-dev.SNSSQSArn}'],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { destination, notify },
  resources: {
    Resources: {
      SQSLambda: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'SQSLambda',
        },
      },
      SNSSQS: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          Subscription: [
            {
              Endpoint: { 'Fn::GetAtt': ['SQSLambda', 'Arn'] },
              Protocol: 'sqs',
            },
          ],
          TopicName: 'SNSSQS',
        },
      },
    },
    Outputs: {
      SNSSQSArn: {
        Value: { Ref: 'SNSSQS' },
        Export: { Name: 'SNSSQSArn' },
      },
      SNSSQSTopicName: {
        Value: {
          'Fn::GetAtt': ['SNSSQS', 'TopicName'],
        },
        Export: { Name: 'SNSSQSTopicName' },
      },
    },
  },
};

module.exports = serverlessConfiguration;
