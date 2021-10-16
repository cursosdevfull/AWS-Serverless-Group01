export default {
  type: 'object',
  properties: {
    kindOfFood: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['kindOfFood', 'price'],
} as const;
