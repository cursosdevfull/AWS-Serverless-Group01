import type { AWS } from '@serverless/typescript';

type Definition = {
  Comment?: string;
  StartAt: string;
  States: {
    [state: string]: {
      Catch?: Catcher[];
      Type:
        | 'Map'
        | 'Task'
        | 'Choice'
        | 'Pass'
        | 'Parallel'
        | 'Wait'
        | 'Succeed'
        | 'Fail';
      Choices?: any[];
      Branches?: any[];
      Parameters?: any;
      End?: boolean;
      Next?: string;
      ItemsPath?: string;
      ResultPath?: string;
      Resource?: string | { 'Fn::GetAtt': string[] };
      Iterator?: Definition;
    };
  };
};

type Catcher = {
  ErrorEquals: ErrorName[];
  Next: string;
  ResultPath?: string;
};

type ErrorName =
  | 'States.ALL'
  | 'States.DataLimitExceeded'
  | 'States.Runtime'
  | 'States.Timeout'
  | 'States.TaskFailed'
  | 'States.Permissions'
  | string;

export interface ServerlessWithStepFunctions extends AWS {
  stepFunctions?: {
    stateMachines: {
      [stateMachine: string]: {
        name: string;
        definition: Definition;
      };
    };
    activities?: string[];
    validate?: boolean;
  };
}
