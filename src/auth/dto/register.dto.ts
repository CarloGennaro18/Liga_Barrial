import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin@liga.com', description: 'Correo del usuario' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'ARBITRO', 'PUBLICO'], description: 'Rol del usuario' })
  @IsIn(['ADMIN', 'ARBITRO', 'PUBLICO'])
  rol!: string;
}