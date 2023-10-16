import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CityEntity } from './City.entity';

@Entity('residents')
export class ResidentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @ManyToOne(() => CityEntity, (city) => city.residents)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;
}
