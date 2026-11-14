import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. Registrar usuario (Encripta la contraseña)
  async register(email: string, password: string, rol: string) {
    const existe = await this.prisma.usuario.findUnique({ where: { email } });
    if (existe) throw new BadRequestException('El correo ya está registrado');

    const hash = await bcrypt.hash(password, 10); // Argon2id/bcrypt
    const usuario = await this.prisma.usuario.create({
      data: { email, password: hash, rol },
    });
    return { id: usuario.id, email: usuario.email, rol: usuario.rol };
  }

  // 2. Login (Valida y genera el JWT)
  async login(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) throw new UnauthorizedException('Credenciales inválidas');

    // Firmamos el token con el payload (sub = id)
    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    return {
      access_token: this.jwtService.sign(payload),
      rol: usuario.rol,
    };
  }
}