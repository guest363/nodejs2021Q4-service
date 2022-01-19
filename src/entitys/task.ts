import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BoardEntity } from './board';
import { ColumnsEntity } from './column';
import { UserEntity } from './user';

/**
 * Entity Задача
 */
@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: 600, nullable: false })
  description!: string;

  @Column()
  order!: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    eager: false,
    onDelete: 'SET NULL',
  })
  user!: UserEntity;

  @Column({ type: 'varchar', length: 128, nullable: true })
  userId!: string | null;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  board!: BoardEntity;

  @Column({ type: 'varchar', length: 128, nullable: true })
  boardId!: string | null;

  @ManyToOne(() => ColumnsEntity, (column) => column.tasks, {
    eager: false,
  })
  column!: ColumnsEntity;

  @Column({ type: 'varchar', length: 128, nullable: true })
  columnId!: string | null;
}
