export const boardSelectFields = {
  id: { type: 'string' },
  title: { type: 'string' },
  columns: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' },
      },
    },
  },
};
