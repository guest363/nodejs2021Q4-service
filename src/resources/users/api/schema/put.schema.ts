import { userInsertFields } from '../../validators/user-insert-fields';
import { userSelectFields } from '../../validators/user-select-fields';
import { uuidAsParam } from '../../../common/validators/uuid-as-param';

export const putSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...userInsertFields,
    },
    response: {
      200: {
        type: 'object',
        properties: userSelectFields,
      },
    },
  },
};
