import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';

@Injectable()
export class PartidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePartidoDto) {
    if (dto.equipoLocalId === dto.equipoVisitanteId) {
      throw new BadRequestException(
        'El equipo local y visitante no pueden ser el mismo',
      );
    }
    return this.prisma.partido.create({
      data: { ...dto, estado: 'programado' },
    });
  }

  async findAll() {
    return this.prisma.partido.findMany();
  }

  async findByCampeonato(campeonatoId: string) {
    return this.prisma.partido.findMany({ where: { campeonatoId } });
  }

  async findOne(id: string) {
    const partido = await this.prisma.partido.findUnique({ where: { id } });
    if (!partido) throw new NotFoundException(`Partido ${id} no encontrado`);
    return partido;
  }

  async update(id: string, dto: UpdatePartidoDto) {
    await this.findOne(id);
    return this.prisma.partido.update({ where: { id }, data: dto });
  }

  /**
   * Registra el resultado.
   * BOLA: si el usuario está vinculado a un árbitro (arbitroId no nulo),
   * solo puede registrar resultados de los partidos que tiene asignados.
   * Si no tiene arbitroId (ej. ADMIN), puede registrar cualquiera.
   * Se devuelve 404 en lugar de 403 para no filtrar la existencia de IDs.
   */
  async registrarResultado(
    id: string,
    dto: RegistrarResultadoDto,
    user: { id: string; arbitroId?: string | null },
  ) {
    const partido = await this.findOne(id);

    if (user.arbitroId && partido.arbitroId !== user.arbitroId) {
      // No es su partido → 404 para evitar filtración
      throw new NotFoundException(`Partido ${id} no encontrado`);
    }

    return this.prisma.partido.update({
      where: { id },
      data: {
        golesLocal: dto.golesLocal,
        golesVisitante: dto.golesVisitante,
        estado: 'jugado',
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.partido.delete({ where: { id } });
  }
}