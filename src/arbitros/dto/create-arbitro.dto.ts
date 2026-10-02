import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArbitroDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono!: string;

  @IsIn(['principal', 'asistente'])
  categoria!: 'principal' | 'asistente';
}