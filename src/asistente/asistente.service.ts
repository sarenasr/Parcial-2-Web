import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './asistente.entity';
import { EventoService } from '../evento/evento.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: Repository<Asistente>,
    private readonly eventoService: EventoService,
  ) {}

  async registrarAsistente(eventoId: number, createAsistenteDto: CreateAsistenteDto): Promise<Asistente> {
    const evento = await this.eventoService.findEventoById(eventoId);

    if (evento.asistentes.some(a => a.email === createAsistenteDto.email)) {
      throw new BadRequestException('No puede haber dos asistentes con el mismo email en un mismo evento');
    }

    if (evento.auditorio && evento.asistentes.length >= evento.auditorio.capacidad) {
      throw new BadRequestException('No puede superarse la capacidad del auditorio del evento');
    }
    

    const asistente = this.asistenteRepository.create(createAsistenteDto);
    asistente.evento = evento;
    return await this.asistenteRepository.save(asistente);
  }

  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoService.findEventoById(eventoId);
    return evento.asistentes;
  }
}
