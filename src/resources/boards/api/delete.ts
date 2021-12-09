import { FastifyReply, FastifyRequest } from 'fastify';
import { taskService } from '../../tasks/task.service';
import { boardService } from '../board.service';

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
