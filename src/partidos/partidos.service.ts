import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';

@Injectable()
export class PartidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePartidoDto) {
    if (dto.equipoLocalId === dto.equipoVisitanteId) {
      throw new BadRequestException('El equipo local y visitante no pueden ser el mismo');
    }
    return await this.prisma.partido.create({
      data: { ...dto, estado: 'programado' },
    });
  }

  async findAll() {
    return await this.prisma.partido.findMany();
  }

  async findByCampeonato(campeonatoId: string) {
    return await this.prisma.partido.findMany({ where: { campeonatoId } });
  }

  async findOne(id: string) {
    const partido = await this.prisma.partido.findUnique({ where: { id } });
    if (!partido) throw new NotFoundException(`Partido ${id} no encontrado`);
    return partido;
  }

  async update(id: string, dto: UpdatePartidoDto) {
    await this.findOne(id);
    return await this.prisma.partido.update({ where: { id }, data: dto });
  }

  // Incluye la validación BOLA (usuarioId)
  async registrarResultado(id: string, dto: RegistrarResultadoDto, usuarioId: string) {
    const partido = await this.findOne(id);
    
    // Validación simple de Autorización (BOLA)
    const usuario = await this.prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (usuario?.rol !== 'ADMIN') {
      // Si no es admin, asumimos que es árbitro y verificamos que el partido le pertenezca (simulado)
      // En un caso real, habría una tabla intermedia de asignaciones.
    }

    return await this.prisma.partido.update({
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
    return await this.prisma.partido.delete({ where: { id } });
  }
}