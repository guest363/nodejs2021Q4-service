import typeorm from 'typeorm';
import { v4 } from 'uuid';

const { Column, Entity, PrimaryColumn } = typeorm;
type columnsConstructorT = {
  id: string;
  title: string;
  order: number;
};
/**
 * Класс Columns
 */

@Entity()
export class Columns {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title: string;

  @Column()
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
