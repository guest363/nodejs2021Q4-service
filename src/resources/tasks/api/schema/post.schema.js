import { uuidAsParam } from '../../../boards/validators/uuid-as-param.js';
import { taskInsertFields } from '../../validators/task-insert-fields.js';
import { taskSelectFieldsPut } from '../../validators/task-select-fields.js';

export const postSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...taskInsertFields,
    },
    response: {
      201: {
        type: 'object',
        properties: taskSelectFieldsPut,
      },
    },
  },
};
