import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { ResidentEntity } from './Resident.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ResidentEntity, (resident) => resident.city)
  residents: ResidentEntity[];
}
