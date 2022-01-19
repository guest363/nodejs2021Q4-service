import { v4 } from 'uuid';

type columnsConstructorT = {
  id: string;
  title: string;
  order: number;
};
/**
 * Класс Columns
 */

export class Columns {
  id!: string;

  title!: string;

  order!: number;

  constructor({
    id = v4(),
    title = 'Default board',
    order = 0,
  }: columnsConstructorT) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
