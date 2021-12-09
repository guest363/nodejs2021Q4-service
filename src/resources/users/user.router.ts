import { FastifyInstance } from 'fastify/types/instance';
import { deleteById } from './api/delete';
import { get } from './api/get';
import { getById } from './api/get-by-id';
import { post } from './api/post';
import { put } from './api/put';
import { getByIdSchema } from './api/schema/get-by-id.schema';
import { getSchema } from './api/schema/get.schema';
import { postSchema } from './api/schema/post.schema';
import { putSchema } from './api/schema/put.schema';

export const userRouter = async (fastify: FastifyInstance) => {
  fastify.get('', getSchema, get);

  fastify.post('', postSchema, post);

  fastify.put('/:userId', putSchema, put);

  fastify.get('/:userId', getByIdSchema, getById);

  fastify.delete('/:userId', getByIdSchema, deleteById);

  await Promise.resolve();
};
