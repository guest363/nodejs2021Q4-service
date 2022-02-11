/**
 * Класс Columns
 */

export class Columns {
  id!: string;

  title!: string;

  order!: number;

  constructor(partial: Partial<Columns>) {
    Object.assign(this, partial);
  }
}
