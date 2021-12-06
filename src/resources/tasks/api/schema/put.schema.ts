import { taskInsertFields } from '../../validators/task-insert-fields.js';
import { taskSelectFields } from '../../validators/task-select-fields.js';
import { uuidAsParam } from '../../validators/uuid-as-param.js';

export const putSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...taskInsertFields,
    },
    response: {
      200: {
        type: 'object',
        properties: taskSelectFields,
      },
    },
  },
};
