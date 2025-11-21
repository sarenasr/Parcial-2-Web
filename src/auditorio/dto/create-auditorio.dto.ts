import { IsString, IsNumber } from 'class-validator';

export class CreateAuditorioDto {
  @IsString()
  nombre: string;

  @IsNumber()
  capacidad: number;

  @IsString()
  ubicacion: string;
}
