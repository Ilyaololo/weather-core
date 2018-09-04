import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'uuid',
    name: 'code_id',
  })
  public codeId: string;

  @Column({
    type: 'text',
  })
  public name: string;

  @Column({
    type: 'float',
  })
  public lat: number;

  @Column({
    type: 'float',
  })
  public lon: number;
}
