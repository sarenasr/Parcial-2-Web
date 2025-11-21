import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponente } from './ponente.entity';
import { PonenteService } from './ponente.service';

import { PonenteController } from './ponente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ponente])],
  providers: [PonenteService],
  controllers: [PonenteController],
  exports: [PonenteService],
})
export class PonenteModule {}
