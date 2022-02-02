import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.tasksService.getAll();
  }
}
