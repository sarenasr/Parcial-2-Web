import { IsString, IsNumber, IsDateString, IsIn, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PonenteIdDto {
  @IsNumber()
  id: number;
}

class AuditorioIdDto {
  @IsNumber()
  id: number;
}

export class CreateEventoDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsNumber()
  duracionHoras: number;

  @IsString()
  @IsIn(['Propuesto', 'Aprobado', 'Rechazado'])
  estado: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PonenteIdDto)
  ponente?: PonenteIdDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AuditorioIdDto)
  auditorio?: AuditorioIdDto;
}
