import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        pattern: {
          source: ['OrderService'],
          'detail-type': ['OrderCreated'],
          detail: {
            kindOfFood: ['mexicana'],
          },
        },
      },
    },
  ],
};
