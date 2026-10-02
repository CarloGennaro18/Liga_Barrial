import {
  IsIn, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min,
} from 'class-validator';

export class CreateTarjetaDto {
  @IsString() @IsNotEmpty()
  partidoId!: string;

  @IsString() @IsNotEmpty()
  jugadorId!: string;

  @IsIn(['amarilla', 'roja'])
  tipo!: 'amarilla' | 'roja';

  @IsInt() @Min(1) @Max(120)
  minuto!: number;

  @IsString() @IsNotEmpty() @MaxLength(200)
  motivo!: string;
}