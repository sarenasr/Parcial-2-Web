import { IsString, IsEmail } from 'class-validator';

export class CreateAsistenteDto {
  @IsString()
  nombre: string;

  @IsString()
  codigoEstudiante: string;

  @IsEmail()
  email: string;
}
