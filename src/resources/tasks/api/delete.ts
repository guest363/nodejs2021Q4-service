import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

/**
 * Endpoint для удаления задачи по ID
 * через reply.send возвращает
 * - в случае успеха задачу и код 204
 * - в случае ошибки код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId, taskId } = request.params as {
    boardId: string;
    taskId: string;
  };

  const isTaskExist = await taskService.getById({ taskId });
  const isBoardExist = await boardService.getById(boardId);

  if (!isTaskExist || !isBoardExist) {
    await reply.code(404).send();
  } else {
    await taskService.delete({
      taskId,
    });
    await reply.code(204).send();
  }
};
