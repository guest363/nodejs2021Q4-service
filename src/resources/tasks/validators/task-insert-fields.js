export const taskInsertFields = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'], format: 'uuid' },
    boardId: { type: ['string', 'null'], format: 'uuid' },
    columnId: { type: ['string', 'null'], format: 'uuid' },
  },
  required: ['title', 'order', 'description', 'userId', 'boardId'],
  additionalProperties: false,
};
