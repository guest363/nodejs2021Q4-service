import { userInsertFields } from '../../validators/user-insert-fields';
import { userSelectFields } from '../../validators/user-select-fields';

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
