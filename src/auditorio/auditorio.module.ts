import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorio } from './auditorio.entity';
import { AuditorioService } from './auditorio.service';
import { AuditorioController } from './auditorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorio])],
  providers: [AuditorioService],
  controllers: [AuditorioController],
  exports: [AuditorioService],
})
export class AuditorioModule {}
