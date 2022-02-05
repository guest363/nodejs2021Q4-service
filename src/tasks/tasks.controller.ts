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
import { TasksService } from './tasks.service';
import { taskSetT } from './types';

@Controller(':boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('boardId') boardId: string) {
    return await this.tasksService.getAll({ boardId });
  }

  /* Create a new board and save it to the database. */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() task: taskSetT, @Param('boardId') boardId: string) {
    const createTask = await this.tasksService.create({
      boardId: boardId,
      task: task,
    });
    return createTask;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const task = await this.tasksService.getById({
      taskId: id,
    });
    if (!task) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cant't find task with id ${id}`,
        },
        HttpStatus.FORBIDDEN
      );
    }
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleteResult = await this.tasksService.delete({
      taskId: id,
    });

    return deleteResult;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() task: taskSetT,
    @Param('boardId') boardId: string
  ) {
    const updatedTask = await this.tasksService.update({
      boardId: boardId,
      taskId: id,
      task: task,
    });

    return updatedTask;
  }
}
