import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Entity Columns
 */

@Entity()
export class ColumnsEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  title!: string;

  @Column()
  order!: number;
}
