export const taskSelectFields = {
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: ['string', 'null'] },
  boardId: { type: ['string', 'null'] },
  columnId: { type: ['string', 'null'] },
};
export const taskSelectFieldsPut = {
  id: { type: 'string' },
  ...taskSelectFields,
};
