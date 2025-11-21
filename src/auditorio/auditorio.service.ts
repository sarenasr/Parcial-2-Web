import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearAuditorio(createAuditorioDto: CreateAuditorioDto): Promise<Auditorio> {
    if (createAuditorioDto.capacidad <= 0) {
      throw new BadRequestException('La capacidad debe ser mayor a cero');
    }
    const auditorio = this.auditorioRepository.create(createAuditorioDto);
    return await this.auditorioRepository.save(auditorio);
  }

  async findAuditorioById(id: number): Promise<Auditorio> {
    const auditorio = await this.auditorioRepository.findOne({ where: { id } });
    if (!auditorio) {
      throw new BadRequestException('Auditorio no encontrado');
    }
    return auditorio;
  }
  
  async findAll(): Promise<Auditorio[]> {
      return await this.auditorioRepository.find();
  }
}
