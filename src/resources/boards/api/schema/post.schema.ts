import { boardInsertFields } from '../../validators/board-insert-fields';
import { boardSelectFields } from '../../validators/board-select-fields';

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
