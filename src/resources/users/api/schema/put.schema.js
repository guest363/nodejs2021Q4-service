import { userInsertFields } from '../../validators/user-insert-fields.js';
import { userSelectFields } from '../../validators/user-select-fields.js';
import { uuidAsParam } from '../../validators/uuid-as-param.js';

export const putSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...userInsertFields,
    },
    response: {
      200: {
        type: 'object',
        properties: userSelectFields,
      },
    },
  },
};
