export const taskInsertFields = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    columns: { type: 'string' },
    userId: { type: 'string', format: 'uuid' },
    boardId: { type: 'string', format: 'uuid' },
    columnId: { type: 'string', format: 'uuid' },
  },
  required: ['title', 'columns', "userId", "boardId", "columnId"],
  additionalProperties: false,
};
