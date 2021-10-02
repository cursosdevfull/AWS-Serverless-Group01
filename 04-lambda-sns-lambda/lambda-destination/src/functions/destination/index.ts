import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sns: {
        arn: '${cf:lambdasns-dev.SNSCursoTopicoArn}',
        topicName: '${cf:lambdasns-dev.SNSCursoTopicoName}',
      },
    },
  ],
};
