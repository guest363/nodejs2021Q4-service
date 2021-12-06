import { v4 as uuidv4 } from 'uuid';

export class Board {
  constructor({
    id = uuidv4(),
    title = 'Default board',
    columns = [{ id: uuidv4(), title: 'Default column', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
