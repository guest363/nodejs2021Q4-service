import { uuidAsParam } from '../../../common/validators/uuid-as-param';
import { taskSelectFields } from '../../validators/task-select-fields';

export const getByIdSchema = {
  schema: {
    ...uuidAsParam,
    response: {
      200: {
        type: 'object',
        properties: taskSelectFields,
      },
    },
  },
};
