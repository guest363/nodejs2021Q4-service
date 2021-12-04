import { taskInsertFields } from '../../validators/task-insert-fields.js';
import { taskSelectFields } from '../../validators/task-select-fields.js';

export const postSchema = {
  schema: {
    body: {
      ...taskInsertFields,
    },
    response: {
      201: {
        type: 'object',
        properties: taskSelectFields,
      },
    },
  },
};
