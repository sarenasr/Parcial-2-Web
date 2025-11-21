import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EventoService } from './evento.service';
import { Evento } from './evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  create(@Body() createEventoDto: CreateEventoDto): Promise<Evento> {
    return this.eventoService.crearEvento(createEventoDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventoService.findEventoById(id);
  }

  @Put(':id/aprobar')
  aprobar(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventoService.eliminarEvento(id);
  }

  @Get()
  findAll(): Promise<Evento[]> {
    return this.eventoService.findAll();
  }
}
