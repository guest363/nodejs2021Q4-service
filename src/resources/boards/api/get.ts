import { boardService } from '../board.service.js';

export const get = async (request, reply) => {
  const boards = await boardService.getAll();
  reply.send(boards);
};
