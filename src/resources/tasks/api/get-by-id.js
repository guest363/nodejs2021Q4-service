import { taskService } from '../task.service.js';

export const getById = async (request, reply) => {
  const board = await taskService.getById({
    boardId: request.params.boardId,
    taskId: request.params.taskId,
  });
  reply.code(200);
  reply.send(board);
};
