import { boardInsertFields } from '../../validators/board-insert-fields.js';
import { boardSelectFields } from '../../validators/board-select-fields.js';

export const postSchema = {
  schema: {
    body: {
      ...boardInsertFields,
    },
    response: {
      201: {
        type: 'object',
        properties: boardSelectFields,
      },
    },
  },
};
