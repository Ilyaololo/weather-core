import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'uuid',
    unique: true,
  })
  public sid: string;

  @Column({
    type: 'text',
  })
  public name: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: 'now()',
  })
  public createdAt: string;

  @Column({
    type: 'timestamp with time zone',
    name: 'updated_at',
    default: 'now()',
  })
  public updatedAt: string;
}
