import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { BoardEntity } from '../entitys/board';
import { Board } from './models/board.model';
import { BoardSetT } from './types';

@Injectable()
export class BoardService {
  async getAll() {
    const result = await getRepository(BoardEntity).find();
    return result;
  }

  async create(board: BoardSetT) {
    const newBoard = new Board(board);
    await getRepository(BoardEntity).save(newBoard);
    return newBoard;
  }

  async getById(id: string) {
    const result = await getRepository(BoardEntity).findOne(id);
    return result;
  }

  async delete(id: string) {
    const result = await getRepository(BoardEntity).delete(id);

    return result.affected !== 0;
  }

  async update(id: string, board: BoardSetT) {
    const updatedBoard = await getRepository(BoardEntity).findOne(id);

    if (updatedBoard) {
      await getRepository(BoardEntity).save({
        ...updatedBoard,
        ...board,
      });
    }

    return { id, ...board };
  }
}
