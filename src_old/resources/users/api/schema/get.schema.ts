import { userSelectFields } from '../../validators/user-select-fields';

export const getSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: userSelectFields,
        },
      },
    },
  },
};
