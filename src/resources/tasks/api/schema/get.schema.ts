
import { uuidAsParam } from '../../../common/validators/uuid-as-param';
import { taskSelectFields } from '../../validators/task-select-fields';

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
