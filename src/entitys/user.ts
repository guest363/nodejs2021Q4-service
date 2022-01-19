import typeorm from 'typeorm';
const { Column, Entity, PrimaryColumn, BaseEntity } = typeorm;

/**
 * Entity Пользователь
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  login!: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password!: string;
}
