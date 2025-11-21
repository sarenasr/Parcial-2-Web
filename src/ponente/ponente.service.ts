import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './ponente.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,
  ) {}

  async crearPonente(createPonenteDto: CreatePonenteDto): Promise<Ponente> {
    if (createPonenteDto.tipoPonente === 'Interno') {
      if (!createPonenteDto.email.endsWith('.edu')) {
        throw new BadRequestException('El email de un ponente interno debe terminar en .edu');
      }
    } else if (createPonenteDto.tipoPonente === 'Invitado') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(createPonenteDto.email)) {
        throw new BadRequestException('El email de un ponente invitado debe ser válido');
      }
    } else {
        throw new BadRequestException('Tipo de ponente no válido');
    }
    const ponente = this.ponenteRepository.create(createPonenteDto);
    return await this.ponenteRepository.save(ponente);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepository.findOne({ where: { id }, relations: ['eventos'] });
    if (!ponente) {
      throw new BadRequestException('Ponente no encontrado');
    }
    return ponente;
  }

  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.findPonenteById(id);
    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new BadRequestException('No se puede eliminar un ponente con eventos asociados');
    }
    await this.ponenteRepository.delete(id);
  }
}
