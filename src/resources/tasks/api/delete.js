import { boardService } from '../../boards/board.service.js';
import { taskService } from '../task.service.js';

export const deleteById = async (request, reply) => {
  const { taskId } = request.params;
  const isTaskExist = await taskService.getById(taskId);
  const isBoardExist = await boardService.getById(request.params.boardId);

  if (!isTaskExist || !isBoardExist) {
    reply.code(404);
    reply.send();
  } else {
    await taskService.delete({
      boardId: request.params.boardId,
      taskId: request.params.taskId,
    });
    reply.code(204);
    reply.send();
  }
};
