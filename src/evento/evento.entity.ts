import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Ponente } from '../ponente/ponente.entity';
import { Auditorio } from '../auditorio/auditorio.entity';
import { Asistente } from '../asistente/asistente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  duracionHoras: number;

  @Column()
  estado: string; // "Propuesto", "Aprobado", "Rechazado"

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos)
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos)
  auditorio: Auditorio;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];
}
