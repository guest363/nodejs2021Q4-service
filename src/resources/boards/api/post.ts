import { boardService } from '../board.service';

export const post = async (request, reply) => {
  const createBoard = await boardService.create(request.body);
  reply.code(201);
  reply.send(createBoard);
};
