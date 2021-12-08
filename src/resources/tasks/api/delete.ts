import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId } = request.params;
  const isTaskExist = await taskService.getById({ taskId });
  const isBoardExist = await boardService.getById(request.params.boardId);

  if (!isTaskExist || !isBoardExist) {
    await reply.code(404).send();
  } else {
    await taskService.delete({
      boardId: request.params.boardId,
      taskId: request.params.taskId,
    });
    await reply.code(204).send();
  }
};
