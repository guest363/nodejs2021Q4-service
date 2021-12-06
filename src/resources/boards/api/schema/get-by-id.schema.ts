import { uuidAsParam } from '../../../common/validators/uuid-as-param';
import { boardSelectFields } from '../../validators/board-select-fields';

export const getByIdSchema = {
  schema: {
    ...uuidAsParam,
    response: {
      200: {
        type: 'object',
        properties: boardSelectFields,
      },
    },
  },
};
