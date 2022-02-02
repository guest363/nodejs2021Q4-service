import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { Task } from '../../../../src/tasks/models/task.model';
import { taskService } from '../task.service';

/**
 * Endpoint для обновления задчи
 * через reply.send возвращает
 * - в случае успеха обновленную задачу и код 200
 * - в случае ошибки код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */

export const put = async (request: FastifyRequest, reply: FastifyReply) => {
  const { boardId, taskId } = request.params as {
    boardId: string;
    taskId: string;
  };

  const isBoardExist = await boardService.getById(boardId);
  const isTaskExist = await taskService.getById({
    taskId,
  });

  if (!isBoardExist || !isTaskExist) {
    await reply.code(404).send();
  } else {
    /**
     * В типе body мы уверены за счет схемы postSchema которая валидирует JSON
     */
    const updatedTask = await taskService.update({
      boardId,
      taskId,
      task: request.body as Task,
    });
    if (!updatedTask) {
      await reply.code(404).send();
    }
    await reply.code(200).send(updatedTask);
  }
};
