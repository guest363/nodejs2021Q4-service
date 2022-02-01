import { uuidAsParam } from '../../../common/validators/uuid-as-param';
import { boardInsertFields } from '../../validators/board-insert-fields';
import { boardSelectFields } from '../../validators/board-select-fields';

export const putSchema = {
  schema: {
    ...uuidAsParam,
    body: {
      ...boardInsertFields,
    },
    response: {
      200: {
        type: 'object',
        properties: boardSelectFields,
      },
    },
  },
};
