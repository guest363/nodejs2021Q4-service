import { boardService } from '../board.service';

export const get = async (request, reply) => {
  const boards = await boardService.getAll();
  reply.send(boards);
};
