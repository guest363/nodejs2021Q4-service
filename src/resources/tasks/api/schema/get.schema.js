import { uuidAsParam } from '../../../boards/validators/uuid-as-param.js';
import { taskSelectFields } from '../../validators/task-select-fields.js';

export const getSchema = {
  schema: {
    ...uuidAsParam,
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: taskSelectFields,
        },
      },
    },
  },
};
