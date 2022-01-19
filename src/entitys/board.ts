import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { ColumnsEntity } from './column';

/**
 * Entity Доска
 */

@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @ManyToMany(() => ColumnsEntity, (ColumnsEntity) => ColumnsEntity.id)
  @JoinTable()
  columns: ColumnsEntity[] = []; // see = [] initialization here
}
