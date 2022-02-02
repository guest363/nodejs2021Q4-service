import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { BoardSetT } from './types';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardService) {}

  /* Get all boards from the database. */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.boardService.getAll();
  }

  /* Create a new board and save it to the database. */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() board: BoardSetT) {
    return await this.boardService.create(board);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.boardService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.boardService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() board: BoardSetT
  ) {
    return await this.boardService.update(id, board);
  }
}
