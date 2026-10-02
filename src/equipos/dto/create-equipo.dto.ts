import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  representante!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono!: string;

  @IsOptional()
  @IsString()
  campeonatoId?: string;
}