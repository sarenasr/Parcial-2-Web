import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from '../evento/evento.entity';

@Entity()
export class Auditorio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column()
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}
