import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../../tasks/task.service';
import { boardService } from '../board.service';

export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { boardId } = request.params;
  const isBoardExist = await boardService.getById(boardId);
  if (!isBoardExist) {
    await reply.code(404).send();
  } else {
    await boardService.delete(boardId);
    const assignTasks = (await taskService.getAll({ boardId })).filter(
      (task) => task.boardId === boardId
    );

    assignTasks.forEach(async (task) => {
      await taskService.delete({ taskId: task.id });
    });

    await reply.code(204).send();
  }
};
