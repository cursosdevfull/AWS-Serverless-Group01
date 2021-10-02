export default {
  type: 'object',
  properties: {
    subject: { type: 'string' },
    recipient: { type: 'string' },
    body: { type: 'string' },
  },
  required: ['subject', 'recipient', 'body'],
} as const;
