import { taskService } from '../task.service.js';

export const post = async (request, reply) => {
  const createBoard = await taskService.create({
    boardId: request.params.boardId,
    task: request.body,
  });
  reply.code(201);
  reply.send(createBoard);
};
