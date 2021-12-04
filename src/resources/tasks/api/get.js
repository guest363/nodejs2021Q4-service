import { taskService } from '../task.service.js';

export const get = async (request, reply) => {
  const boards = await taskService.getAll({
    boardId: request.params.boardId,
  });
  reply.send(boards);
};
