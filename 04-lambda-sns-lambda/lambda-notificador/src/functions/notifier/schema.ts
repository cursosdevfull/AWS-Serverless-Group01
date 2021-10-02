export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    subject: { type: 'string' },
  },
  required: ['name', 'email', 'subject'],
} as const;
