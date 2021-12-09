import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

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
