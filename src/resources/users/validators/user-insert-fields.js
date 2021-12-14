export const userInsertFields = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['name', 'login', 'password'],
  additionalProperties: false,
};
