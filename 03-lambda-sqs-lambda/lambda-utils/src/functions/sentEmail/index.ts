import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: { arn: '${cf:lambdasqs-dev.SQSQueueArn}' },
    },
  ],
};
