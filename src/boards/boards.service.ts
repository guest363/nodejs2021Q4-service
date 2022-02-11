import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entitys/board';
import { Board } from './models/board.model';
import { BoardSetT } from './types';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>
  ) {}

  async getAll() {
    const result = await this.boardRepository.find();
    return result;
  }

  async create(board: BoardSetT) {
    const newBoard = new Board(board);
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  async getById(id: string) {
    const result = await this.boardRepository.findOne(id);
    return result;
  }

  async delete(id: string): Promise<boolean | Error> {
    try {
      const result = await this.boardRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      throw new Error('Board dose not exist');
    }
  }

  async update(id: string, board: BoardSetT) {
    const updatedBoard = await this.boardRepository.findOne(id);

    if (updatedBoard) {
      await this.boardRepository.save({
        ...updatedBoard,
        ...board,
      });
    }

    return { id, ...board };
  }
}
