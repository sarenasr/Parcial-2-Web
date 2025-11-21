import { IsString, IsNumber, IsEmail, IsIn } from 'class-validator';

export class CreatePonenteDto {
  @IsNumber()
  cedula: number;

  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['Interno', 'Invitado'])
  tipoPonente: string;

  @IsString()
  especialidad: string;
}
