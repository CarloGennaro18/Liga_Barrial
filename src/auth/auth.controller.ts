import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'El rol se asigna automáticamente: primer usuario → ADMIN, resto → PUBLICO.',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 400, description: 'Correo ya registrado o datos inválidos' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener JWT' })
  @ApiResponse({ status: 201, description: 'Token JWT emitido' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}