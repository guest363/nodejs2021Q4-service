import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../task.service';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  const tasks = await taskService.getAll({
    boardId,
  });

  await reply.code(200).send(tasks);
};
