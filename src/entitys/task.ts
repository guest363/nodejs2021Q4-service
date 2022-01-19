import typeorm from 'typeorm';

const { Column, Entity, PrimaryColumn, BaseEntity } = typeorm;

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

  @Column({ type: 'varchar', length: 128, nullable: true })
  userId!: string | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  boardId!: string | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  columnId!: string | null;
}
