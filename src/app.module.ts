import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteModule } from './ponente/ponente.module';
import { EventoModule } from './evento/evento.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { AsistenteModule } from './asistente/asistente.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PonenteModule,
    EventoModule,
    AuditorioModule,
    AsistenteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
