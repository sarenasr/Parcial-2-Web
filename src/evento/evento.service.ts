import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { PonenteService } from '../ponente/ponente.service';
import { AuditorioService } from '../auditorio/auditorio.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    private readonly ponenteService: PonenteService,
    private readonly auditorioService: AuditorioService,
  ) {}

  async crearEvento(createEventoDto: CreateEventoDto): Promise<Evento> {
    if (createEventoDto.duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser positiva');
    }

    const evento = this.eventoRepository.create({
      titulo: createEventoDto.titulo,
      descripcion: createEventoDto.descripcion,
      fecha: createEventoDto.fecha,
      duracionHoras: createEventoDto.duracionHoras,
      estado: createEventoDto.estado,
    });

    if (createEventoDto.ponente) {
        const ponente = await this.ponenteService.findPonenteById(createEventoDto.ponente.id);
        if (ponente.tipoPonente === 'Invitado') {
            if (!createEventoDto.descripcion || createEventoDto.descripcion.length < 50) {
                throw new BadRequestException('La descripción debe tener al menos 50 caracteres para ponentes invitados');
            }
        }
        evento.ponente = ponente;
    }

    if (createEventoDto.auditorio) {
        const auditorio = await this.auditorioService.findAuditorioById(createEventoDto.auditorio.id);
        evento.auditorio = auditorio;
    }

    return await this.eventoRepository.save(evento);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id }, relations: ['ponente', 'auditorio', 'asistentes'] });
    if (!evento) {
      throw new BadRequestException('Evento no encontrado');
    }
    return evento;
  }

  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.findEventoById(id);
    if (!evento.auditorio) {
      throw new BadRequestException('Solo puede aprobarse si tiene un auditorio asignado');
    }
    evento.estado = 'Aprobado';
    return await this.eventoRepository.save(evento);
  }

  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.findEventoById(id);
    if (evento.estado === 'Aprobado') {
      throw new BadRequestException('No se puede eliminar si ya está Aprobado');
    }
    await this.eventoRepository.delete(id);
  }
  
  async findAll(): Promise<Evento[]> {
      return await this.eventoRepository.find({ relations: ['ponente', 'auditorio'] });
  }
}
