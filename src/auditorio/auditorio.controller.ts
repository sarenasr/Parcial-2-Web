import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { Auditorio } from './auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Controller('auditorios')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  create(@Body() createAuditorioDto: CreateAuditorioDto): Promise<Auditorio> {
    return this.auditorioService.crearAuditorio(createAuditorioDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Auditorio> {
    return this.auditorioService.findAuditorioById(id);
  }

  @Get()
  findAll(): Promise<Auditorio[]> {
    return this.auditorioService.findAll();
  }
}
