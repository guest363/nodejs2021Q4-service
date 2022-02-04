import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardService } from './boards.service';
import { BoardSetT } from './types';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardService) {}

  /* Get all boards from the database. */
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.boardService.getAll();
  }

  /* Create a new board and save it to the database. */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() board: BoardSetT) {
    return await this.boardService.create(board);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const board = await this.boardService.getById(id);
    if (!board) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cant't find boad with id ${id}`,
        },
        HttpStatus.FORBIDDEN
      );
    }
    return board;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleteResult = await this.boardService.delete(id);
    if (deleteResult instanceof Error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cant't find boad with id ${id}`,
        },
        HttpStatus.FORBIDDEN
      );
    }
    return deleteResult;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() board: BoardSetT
  ) {
    return await this.boardService.update(id, board);
  }
}
