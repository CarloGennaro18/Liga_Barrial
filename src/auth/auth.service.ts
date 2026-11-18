import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existe = await this.prisma.usuario.findUnique({ where: { email } });
    if (existe) throw new BadRequestException('El correo ya está registrado');

    // Asignación automática: primer usuario = ADMIN, resto = PUBLICO
    const count = await this.prisma.usuario.count();
    const rolNombre = count === 0 ? 'ADMIN' : 'PUBLICO';

    const rol = await this.prisma.rol.findUnique({ where: { nombre: rolNombre } });
    if (!rol) {
      throw new BadRequestException(
        'Roles no configurados. Ejecuta `npx prisma db seed`',
      );
    }

    const hash = await argon2.hash(password);
    const usuario = await this.prisma.usuario.create({
      data: { email, password: hash, rolId: rol.id },
      include: { rol: true },
    });

    return {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol?.nombre ?? null,
    };
  }

  async login(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: { rol: true },
    });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const valida = await argon2.verify(usuario.password, password);
    if (!valida) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol?.nombre ?? null,
      arbitroId: usuario.arbitroId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      rol: usuario.rol?.nombre ?? null,
    };
  }
}