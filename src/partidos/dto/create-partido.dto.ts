import {
  IsDateString, IsInt, IsNotEmpty, IsString, Matches, Min,
} from 'class-validator';

export class CreatePartidoDto {
  @IsString() @IsNotEmpty()
  campeonatoId!: string;

  @IsInt() @Min(1)
  jornada!: number;

  @IsString() @IsNotEmpty()
  equipoLocalId!: string;

  @IsString() @IsNotEmpty()
  equipoVisitanteId!: string;

  @IsString() @IsNotEmpty()
  arbitroId!: string;

  @IsString() @IsNotEmpty()
  canchaId!: string;

  @IsDateString()
  fecha!: string;

  /** Formato HH:mm (24 horas) */
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'La hora debe tener el formato HH:mm (ej. 18:30)',
  })
  hora!: string;
}