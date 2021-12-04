import { v4 as uuidv4 } from 'uuid';

export class Task {
  constructor({
    id = uuidv4(),
    title = 'Default task',
    description = 'Some awesome description',
    /**
     * assignee entity
     */
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
