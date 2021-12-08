import { v4 } from 'uuid';

export class Board {
  id: string;

  title: string;

  columns: {
    id: string;

    title: string;

    order: number;
  }[];

  constructor({
    id = v4(),
    title = 'Default board',
    columns = [{ id: v4(), title: 'Default column', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
