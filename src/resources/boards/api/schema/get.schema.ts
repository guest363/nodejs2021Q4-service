import { boardSelectFields } from '../../validators/board-select-fields';

export const getSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: boardSelectFields,
        },
      },
    },
  },
};
