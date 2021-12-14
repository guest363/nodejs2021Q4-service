import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../../tasks/task.service';
import { boardService } from '../board.service';

/**
 * Endpoint для удаления доски по ID.
 *
 * При этом удаляются и все связанные с ней задачи.
 *
 * - статус код 204 в случае успеха
 * - в случае ее отсутствия возвращает код 404
 *
 * @param request - FastifyRequest is an instance of the standard http or http2 request objects. It defaults to http.IncomingMessage, and it also extends the relative request object.
 * @param reply - FastifyReply is an instance of the standard http or http2 reply types. It defaults to http.ServerResponse, and it also extends the relative reply object.
 */
export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params as { boardId: string };

  if ((await boardService.delete(boardId)) instanceof Error) {
    await reply.code(404).send();
  }

  const assignTasks = (await taskService.getAll({ boardId })).filter(
    (task) => task.boardId === boardId
  );

  assignTasks.map(async (task) => {
    await taskService.delete({ taskId: task.id });
  });

  await reply.code(204).send();
};
