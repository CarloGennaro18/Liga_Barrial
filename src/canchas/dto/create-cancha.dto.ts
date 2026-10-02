import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCanchaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  direccion!: string;

  @IsInt()
  @Min(10)
  @Max(100000)
  capacidad!: number;
}