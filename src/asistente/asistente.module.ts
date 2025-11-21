import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistente } from './asistente.entity';
import { AsistenteService } from './asistente.service';
import { EventoModule } from '../evento/evento.module';

import { AsistenteController } from './asistente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asistente]),
    EventoModule,
  ],
  providers: [AsistenteService],
  controllers: [AsistenteController],
  exports: [AsistenteService],
})
export class AsistenteModule {}
