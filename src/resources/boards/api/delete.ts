import { taskService } from '../../tasks/task.service';
import { boardService } from '../board.service';

export const deleteById = async (request, reply) => {
  const { boardId } = request.params;
  const isBoardExist = await boardService.getById(boardId);
  if (!isBoardExist) {
    reply.code(404);
    reply.send();
  } else {
    await boardService.delete(boardId);
    const assignTasks = (await taskService.getAll({ boardId })).filter(
      (task) => task.boardId === boardId,
    );

    assignTasks.forEach(async (task) => {
      await taskService.delete({ taskId: task.id });
    });

    reply.code(204);
    reply.send();
  }
};
