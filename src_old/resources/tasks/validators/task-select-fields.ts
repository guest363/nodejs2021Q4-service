export const taskSelectFields = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: 'number' },
  description: { type: 'string' },
  userId: { type: ['string', 'null'] },
  boardId: { type: ['string', 'null'] },
  columnId: { type: ['string', 'null'] },
};
