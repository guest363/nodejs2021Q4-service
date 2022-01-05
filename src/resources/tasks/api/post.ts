import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { Task } from '../task.model';
import { taskService } from '../task.service';

/**
 * Endpoint для создания задачи
 * через reply.send возвращает
 * - в случае успеха обновленную задачу и код 201
 * - в случае ошибки код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId } = request.params as { boardId: string };
  const isBoardExist = await boardService.getById(boardId);

  if (!isBoardExist) {
    await reply.code(404).send();
  } else {
    /**
     * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
     */
    const createTask = await taskService.create({
      boardId: (request.params as { boardId: string }).boardId,
      task: request.body as Task,
    });
    await reply.code(201).send(createTask);
  }
};
