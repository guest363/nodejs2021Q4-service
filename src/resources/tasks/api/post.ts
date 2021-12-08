import { FastifyReply, FastifyRequest } from 'fastify';
import { boardService } from '../../boards/board.service';
import { taskService } from '../task.service';

export const post = async (request: FastifyRequest, reply: FastifyReply) => {
  const isBoardExist = await boardService.getById(request.params.boardId);

  if (!isBoardExist) {
    await reply.code(404).send();
  } else {
    const createTask = await taskService.create({
      boardId: request.params.boardId,
      task: request.body,
    });
    await reply.code(201).send(createTask);
  }
};
