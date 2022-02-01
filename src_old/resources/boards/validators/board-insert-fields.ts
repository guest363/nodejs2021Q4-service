export const boardInsertFields = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
  required: ['title', 'columns'],
  additionalProperties: false,
};
