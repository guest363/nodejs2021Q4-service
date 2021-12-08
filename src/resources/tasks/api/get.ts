import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../task.service';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const tasks = await taskService.getAll({
    boardId: request.params.boardId,
  });
  
  await reply.code(200).send(tasks);
};
