import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnsEntity } from './column';
import { TaskEntity } from './task';

/**
 * Entity Доска
 */

@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @OneToMany(() => ColumnsEntity, (column) => column.board, {
    eager: true,
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
  })
  @JoinTable()
  columns!: ColumnsEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board, {
    eager: false,
  })
  tasks!: TaskEntity[];

  @AfterLoad()
  sortItems(): void {
    if (this.columns.length > 0) {
      this.columns.sort((a, b) => a.order - b.order);
    }
  }
}
