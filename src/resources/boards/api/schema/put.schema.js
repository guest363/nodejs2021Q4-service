import { boardInsertFields } from '../../validators/board-insert-fields.js';
import { boardSelectFields } from '../../validators/board-select-fields.js';
import { uuidAsParam } from '../../validators/uuid-as-param.js';

export const putSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...boardInsertFields,
    },
    response: {
      200: {
        type: 'object',
        properties: boardSelectFields,
      },
    },
  },
};
