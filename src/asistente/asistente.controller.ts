import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AsistenteService } from './asistente.service';
import { Asistente } from './asistente.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';

@Controller('asistentes')
export class AsistenteController {
  constructor(private readonly asistenteService: AsistenteService) {}

  @Post(':eventoId')
  registrar(@Param('eventoId', ParseIntPipe) eventoId: number, @Body() createAsistenteDto: CreateAsistenteDto): Promise<Asistente> {
    return this.asistenteService.registrarAsistente(eventoId, createAsistenteDto);
  }

  @Get(':eventoId')
  findByEvento(@Param('eventoId', ParseIntPipe) eventoId: number): Promise<Asistente[]> {
    return this.asistenteService.findAsistentesByEvento(eventoId);
  }
}
