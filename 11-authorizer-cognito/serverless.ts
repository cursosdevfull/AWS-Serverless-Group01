import type { AWS } from '@serverless/typescript';

import clients from '@functions/clients';

const serverlessConfiguration: AWS = {
  service: 'authorizer-cognito',
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
  },
  // import the function via paths
  functions: { clients },
  resources: {
    Resources: {
      CognitoUserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: 'cognito_user_pool_aws01',
          AutoVerifiedAttributes: ['email'],
          EmailVerificationSubject: 'Verifica tu correo electrónico',
          EmailVerificationMessage:
            'Por favor verifica tu correo electrónico.  Ingresando el siguiente código: {####}',
        },
      },
      CognitoUserPoolClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: 'cognito_user_pool_client_aws01',
          UserPoolId: {
            Ref: 'CognitoUserPool',
          },
          ExplicitAuthFlows: [
            'ALLOW_USER_PASSWORD_AUTH',
            'ALLOW_REFRESH_TOKEN_AUTH',
          ],
        },
      },
      CognitoIdentityPool: {
        Type: 'AWS::Cognito::IdentityPool',
        Properties: {
          IdentityPoolName: 'cognito_identity_pool_aws01',
          AllowUnauthenticatedIdentities: false,
          CognitoIdentityProviders: [
            {
              ClientId: {
                Ref: 'CognitoUserPoolClient',
              },
              ProviderName: {
                'Fn::GetAtt': ['CognitoUserPool', 'ProviderName'],
              },
            },
          ],
        },
      },
      CognitoIdentityPoolRoles: {
        Type: 'AWS::Cognito::IdentityPoolRoleAttachment',
        Properties: {
          IdentityPoolId: {
            Ref: 'CognitoIdentityPool',
          },
          Roles: {
            authenticated: {
              'Fn::GetAtt': ['CognitoAuthRole', 'Arn'],
            },
            unauthenticated: {
              'Fn::GetAtt': ['CognitoUnauthRole', 'Arn'],
            },
          },
        },
      },
      CognitoAuthRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'cognitoAuthRoleAWS01',
          Path: '/',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Federated: 'cognito-identity.amazonaws.com',
                },
                Action: ['sts:AssumeRoleWithWebIdentity'],
                Condition: {
                  StringEquals: {
                    'cognito-identity.amazonaws.com:aud': {
                      Ref: 'CognitoIdentityPool',
                    },
                  },
                  'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: 'CognitoAuthorizedPolicy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'mobileanalytics:PutEvents',
                      'cognito-sync:*',
                      'cognito-identity:*',
                    ],
                    Resource: '*',
                  },
                  {
                    Effect: 'Allow',
                    Action: ['execute-api:Invoke'],
                    Resource: '*',
                  },
                ],
              },
            },
          ],
        },
      },
      CognitoUnauthRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'cognitoUnauthRoleAWS01',
          Path: '/',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Federated: 'cognito-identity.amazonaws.com',
                },
                Action: ['sts:AssumeRoleWithWebIdentity'],
                Condition: {
                  StringEquals: {
                    'cognito-identity.amazonaws.com:aud': {
                      Ref: 'CognitoIdentityPool',
                    },
                  },
                  'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'unauthenticated',
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: 'CognitoAuthorizedPolicy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'mobileanalytics:PutEvents',
                      'cognito-sync:*',
                      'cognito-identity:*',
                    ],
                    Resource: '*',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
