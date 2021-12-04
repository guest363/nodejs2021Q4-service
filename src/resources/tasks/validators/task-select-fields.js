export const taskSelectFields = {
  id: { type: 'string' },
  title: { type: 'string' },
  columns: { type: 'string' },
  userId: { type: 'string', format: 'uuid' },
  boardId: { type: 'string', format: 'uuid' },
  columnId: { type: 'string', format: 'uuid' },
};
