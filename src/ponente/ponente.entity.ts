import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from '../evento/evento.entity';

@Entity()
export class Ponente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  tipoPonente: string; // "Interno", "Invitado"

  @Column()
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
