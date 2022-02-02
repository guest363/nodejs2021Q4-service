import { FastifyInstance } from 'fastify';
import { deleteById } from './api/delete';
import { get } from './api/get';
import { getById } from './api/get-by-id';
import { post } from './api/post';
import { put } from './api/put';
import { getByIdSchema } from '../../../src/boards/schema/get-by-id.schema';
import { getSchema } from '../../../src/boards/schema/get.schema';
import { postSchema } from '../../../src/boards/schema/post.schema';
import { putSchema } from '../../../src/boards/schema/put.schema';

export const boardRouter = async (fastify: FastifyInstance) => {
  fastify.get('', getSchema, get);

  fastify.post('', postSchema, post);

  fastify.put('/:boardId', putSchema, put);

  fastify.get('/:boardId', getByIdSchema, getById);

  fastify.delete('/:boardId', getByIdSchema, deleteById);

  await Promise.resolve();
};
