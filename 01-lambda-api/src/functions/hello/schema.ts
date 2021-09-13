export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    lastname: { type: 'string' },
  },
  required: ['name'],
} as const;
