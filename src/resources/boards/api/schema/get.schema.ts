import { boardSelectFields } from '../../validators/board-select-fields.js';

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
