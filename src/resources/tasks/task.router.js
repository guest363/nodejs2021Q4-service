import { getById } from './api/get-by-id.js';
import { get } from './api/get.js';
import { post } from './api/post.js';
import { put } from './api/put.js';
import { getByIdSchema } from './api/schema/get-by-id.schema.js';
import { getSchema } from './api/schema/get.schema.js';
import { postSchema } from './api/schema/post.schema.js';
import { putSchema } from './api/schema/put.schema.js';

export const taskRouter = async (fastify) => {
  fastify.get('/:boardId/tasks', getSchema, get);

  fastify.post('/:boardId/tasks', postSchema, post);

  fastify.put('/:boardId/tasks/:taskId', putSchema, put);

  fastify.get('/:boardId/tasks/:taskId', getByIdSchema, getById);

  fastify.delete('/:boardId/tasks/:taskId', getByIdSchema, getById);
};
