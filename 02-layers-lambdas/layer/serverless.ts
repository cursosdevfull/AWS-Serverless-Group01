import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'base-layer',
  frameworkVersion: '2',
  custom: {},
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-2',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {},
  layers: {
    baseLayer: {
      name: 'baseLayer',
      path: 'base_layer',
      retain: true,
      compatibleRuntimes: ['nodejs12.x'],
    },
  },
};

module.exports = serverlessConfiguration;
