import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entitys/task';
import {
  TaskApiCreateT,
  TaskApiDeleteT,
  TaskApiGetAllT,
  TaskApiGetByIdT,
  TaskApiUpdateT,
} from './types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>
  ) {}

  /**
   * Возвращает список всех задач на доске
   *
   * @param info - info.boardId ИД с какой доски собирать задачи
   * @returns список всех задач
   */
  async getAll(props: TaskApiGetAllT) {
    const result = await this.taskRepository.find({
      boardId: props.boardId,
    });
    return result;
  }

  /**
   * Служеюная функция для получения всех задачь со всех бордов
   *
   * @returns возвращает все задачи со всех бордов
   */
  async supportGetAll() {
    const result = await this.taskRepository.find();
    return result;
  }

  /**
   * Создает и возвращает новую задачу
   *
   * @param info - данные для создания новой задачи.
   * - info.task - задача,
   * - info.boardId id к какой доске привязать
   * @returns созданная задача
   */
  async create({ task, boardId }: TaskApiCreateT) {
    const newTask = this.taskRepository.create({ ...task, boardId });
    await this.taskRepository.save(newTask);

    return newTask;
  }

  /**
   * Возвращает задачу по ID
   *
   * @param info
   * - info.id запрашиваемой задачи
   * @returns полученная по ID задача
   */
  async getById({ taskId }: TaskApiGetByIdT) {
    const result = await this.taskRepository.findOne(taskId);
    return result;
  }

  /**
   * Удаляет задачу по ИД
   *
   * @param info - info.taskId ID задачи для удаления
   * @returns
   * - true в случае успеха
   * - Error в случае ошибки
   */
  async delete({ taskId, boardId }: TaskApiDeleteT) {
    const delTasks = await this.taskRepository.findOne({
      boardId,
      id: taskId,
    });
    if (!delTasks) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.taskRepository.delete(taskId);
    return result.affected !== 0;
  }

  /**
   * Обновляет задачу
   *
   * @param info - данные для обновления
   * - info.boardId - ID борда к которой приязанв задача
   * - info.taskId - ID обновляемой задачи
   * - info.task - задача
   * @returns  - Error в случае ошибки обновления, если задачи для обновления нет
   * - обновленную задачу в случае успеха
   */
  async update({ boardId, taskId, task }: TaskApiUpdateT) {
    const savedTask = await this.taskRepository.findOne({
      where: { id: taskId, boardId },
    });

    if (!savedTask) {
      throw new Error('Task not update');
    }

    const newTask = { ...savedTask, ...task };

    await this.taskRepository.save(newTask);

    return newTask;
  }
}
