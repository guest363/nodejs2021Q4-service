import { userSelectFields } from '../../validators/user-select-fields.js';
import { uuidAsParam } from '../../validators/uuid-as-param.js';

export const getByIdSchema = {
  schema: {
    ...uuidAsParam,
    response: {
      200: {
        type: 'object',
        properties: userSelectFields,
      },
    },
  },
};
