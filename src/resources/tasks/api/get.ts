import { taskService } from '../task.service';

export const get = async (request, reply) => {
  const tasks = await taskService.getAll({
    boardId: request.params.boardId,
  });
  reply.code(200);
  reply.send(tasks);
};
