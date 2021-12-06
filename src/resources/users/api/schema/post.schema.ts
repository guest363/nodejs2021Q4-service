import { userInsertFields } from '../../validators/user-insert-fields.js';
import { userSelectFields } from '../../validators/user-select-fields.js';

export const postSchema = {
  schema: {
    body: {
      ...userInsertFields,
    },
    response: {
      201: {
        type: 'object',
        properties: userSelectFields,
      },
    },
  },
};
