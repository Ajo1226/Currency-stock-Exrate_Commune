import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
