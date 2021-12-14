import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../task.service';

/**
 * Endpoint для получения всех тасок на борде
 * через reply.send возвращает
 * - массив задач и код 200
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };

  const tasks = await taskService.getAll({
    boardId,
  });

  await reply.code(200).send(tasks);
};
