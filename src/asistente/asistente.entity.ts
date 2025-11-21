import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from '../evento/evento.entity';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes)
  evento: Evento;
}
