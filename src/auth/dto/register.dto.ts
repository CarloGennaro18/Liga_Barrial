import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'arbitro@liga.com', description: 'Correo del usuario' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', minLength: 6, description: 'Contraseña' })
  @IsString()
  @MinLength(6)
  password!: string;

  // El primer usuario registrado → ADMIN. Los demás → PUBLICO.
}