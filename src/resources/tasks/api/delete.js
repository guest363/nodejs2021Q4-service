import { taskService } from '../task.service.js';

export const getById = async (request, reply) => {
  const { taskId } = request.params;
  const isBoardExist = taskService.has(taskId);
  if (!isBoardExist) {
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
