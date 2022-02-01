import { FastifyInstance } from 'fastify';
import { deleteById } from './api/delete';
import { get } from './api/get';
import { getById } from './api/get-by-id';
import { post } from './api/post';
import { put } from './api/put';
import { getByIdSchema } from './api/schema/get-by-id.schema';
import { getSchema } from './api/schema/get.schema';
import { postSchema } from './api/schema/post.schema';
import { putSchema } from './api/schema/put.schema';

export const boardRouter = async (fastify: FastifyInstance) => {
  fastify.get('', getSchema, get);

  fastify.post('', postSchema, post);

  fastify.put('/:boardId', putSchema, put);

  fastify.get('/:boardId', getByIdSchema, getById);

  fastify.delete('/:boardId', getByIdSchema, deleteById);

  await Promise.resolve();
};
