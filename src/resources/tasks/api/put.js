import { taskService } from '../task.service.js';

export const put = async (request, reply) => {
  const updateBoard = await taskService.update({
    boardId: request.params.boardId,
    taskId: request.params.taskId,
    task: request.body,
  });
  reply.code(200);
  reply.send(updateBoard);
};
