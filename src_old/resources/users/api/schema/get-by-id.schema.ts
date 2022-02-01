import { userSelectFields } from '../../validators/user-select-fields';
import { uuidAsParam } from '../../../common/validators/uuid-as-param';

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
