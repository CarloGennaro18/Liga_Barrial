import {
  IsIn, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength,
} from 'class-validator';

export class CreateJugadorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  nombre!: string;

  @IsInt()
  @Min(1)
  @Max(99)
  numeroCamiseta!: number;

  @IsIn(['portero', 'defensa', 'mediocampista', 'delantero'])
  posicion!: 'portero' | 'defensa' | 'mediocampista' | 'delantero';

  @IsString()
  @IsNotEmpty()
  equipoId!: string;
}