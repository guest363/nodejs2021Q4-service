import { deleteById } from './api/delete.js';
import { getById } from './api/get-by-id.js';
import { get } from './api/get.js';
import { post } from './api/post.js';
import { put } from './api/put.js';
import { getByIdSchema } from './api/schema/get-by-id.schema.js';
import { getSchema } from './api/schema/get.schema.js';
import { postSchema } from './api/schema/post.schema.js';
import { putSchema } from './api/schema/put.schema.js';

export const boardRouter = async (fastify) => {
  fastify.get('', getSchema, get);

  fastify.post('', postSchema, post);

  fastify.put('/:boardId', putSchema, put);

  fastify.get('/:boardId', getByIdSchema, getById);

  fastify.delete('/:boardId', getByIdSchema, deleteById);
};
