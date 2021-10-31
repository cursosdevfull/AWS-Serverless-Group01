import { middyfy } from '@libs/lambda';
import * as aws from 'aws-sdk';

const sft = new aws.StepFunctions();

const callStepFunctions = (number) => {
  console.log('callStepFunctions');
  const stateMachineName = 'initialStateMachine';

  return sft
    .listStateMachines({})
    .promise()
    .then((listStateMachines) => {
      console.log('Listing states machines');

      const lengthStateMachines = listStateMachines.stateMachines.length;

      for (let ind = 0; ind < lengthStateMachines; ind++) {
        const stateMachine = listStateMachines.stateMachines[ind];
        if (stateMachine.name.indexOf(stateMachineName) > -1) {
          console.log('stateMachine found');
          return sft
            .startExecution({
              stateMachineArn: stateMachine.stateMachineArn,
              name: '' + Math.random(),
              input: JSON.stringify({ number: +number }),
            })
            .promise()
            .then(() => true);
        }
      }
    });
};

const trigger = async (event) => {
  console.log('trigger step functions');
  const number = event.queryStringParameters.number;
  console.log('Number received: ' + number);

  try {
    const result = await callStepFunctions(number);
    console.log('result: ' + result);
    return { body: JSON.stringify({ message: 'Trigger was called' }) };
  } catch (error) {
    console.log(error);
    return 'Error: ' + error.message;
  }
};

export const main = middyfy(trigger);
