export const uuidAsParam = {
  params: {
    type: 'object',
    properties: {
      uuid: { type: 'string', format: 'uuid' },
    },
  },
};
