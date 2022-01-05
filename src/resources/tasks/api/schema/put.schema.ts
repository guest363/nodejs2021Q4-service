import { uuidAsParam } from '../../../common/validators/uuid-as-param';
import { taskInsertFields } from '../../validators/task-insert-fields';
import { taskSelectFields } from '../../validators/task-select-fields';

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
