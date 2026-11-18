import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si el endpoint no declara permisos, no restringe
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // JwtAuthGuard debió poblar req.user
    if (!user?.id) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Consulta dinámica: si revocan un permiso, surte efecto inmediato
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: user.id },
      include: {
        rol: {
          include: { permisos: { include: { permiso: true } } },
        },
      },
    });

    if (!usuario?.rol) {
      throw new ForbiddenException('El usuario no tiene rol asignado');
    }

    const userPerms = usuario.rol.permisos.map((rp) => rp.permiso.codigo);
    const hasAll = required.every((p) => userPerms.includes(p));

    if (!hasAll) {
      throw new ForbiddenException(
        `Permisos insuficientes. Requerido: ${required.join(', ')}`,
      );
    }
    return true;
  }
}