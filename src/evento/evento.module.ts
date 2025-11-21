import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './evento.entity';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { PonenteModule } from '../ponente/ponente.module';
import { AuditorioModule } from '../auditorio/auditorio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evento]),
    PonenteModule,
    AuditorioModule,
  ],
  providers: [EventoService],
  controllers: [EventoController],
  exports: [EventoService],
})
export class EventoModule {}
