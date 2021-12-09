import { taskRepo } from './task.memory.repository';
import {
  taskApiCreateT,
  taskApiDeleteT,
  taskApiGetAllT,
  taskApiGetByIdT,
  taskApiUpdateT,
} from './types';

export const taskService = {
  getAll: (props: taskApiGetAllT) => taskRepo.getAll(props),
  create: (props: taskApiCreateT) => taskRepo.create(props),
  getById: (props: taskApiGetByIdT) => taskRepo.getById(props),
  delete: (props: taskApiDeleteT) => taskRepo.delete(props),
  update: (props: taskApiUpdateT) => taskRepo.update(props),
  supportGetAll: () => taskRepo.supportGetAll(),
};
