import { IsNotEmpty, IsString } from 'class-validator';

export class InscribirEquipoDto {
  @IsString()
  @IsNotEmpty()
  campeonatoId!: string;
}