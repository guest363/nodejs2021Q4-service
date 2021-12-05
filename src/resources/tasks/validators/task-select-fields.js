export const taskSelectFields = {
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: ['string', 'null'], format: 'uuid' },
  boardId: { type: ['string', 'null'], format: 'uuid' },
  columnId: { type: ['string', 'null'], format: 'uuid' },
};
export const taskSelectFieldsPut = {
  id: { type: 'string', format: 'uuid' },
  ...taskSelectFields,
};
