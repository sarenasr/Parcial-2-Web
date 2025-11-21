import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PonenteService } from './ponente.service';
import { Ponente } from './ponente.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Controller('ponentes')
export class PonenteController {
  constructor(private readonly ponenteService: PonenteService) {}

  @Post()
  create(@Body() createPonenteDto: CreatePonenteDto): Promise<Ponente> {
    return this.ponenteService.crearPonente(createPonenteDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Ponente> {
    return this.ponenteService.findPonenteById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ponenteService.eliminarPonente(id);
  }
}
