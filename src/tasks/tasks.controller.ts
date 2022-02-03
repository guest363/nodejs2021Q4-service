import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller(':boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Param('boardId') boardId: string) {
    return await this.tasksService.getAll({ boardId });
  }
}
