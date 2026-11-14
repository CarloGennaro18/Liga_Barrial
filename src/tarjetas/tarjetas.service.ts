import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';

@Injectable()
export class TarjetasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTarjetaDto) {
    // Validar que existan el partido y el jugador
    const partido = await this.prisma.partido.findUnique({ where: { id: dto.partidoId } });
    const jugador = await this.prisma.jugador.findUnique({ where: { id: dto.jugadorId } });
    
    if (!partido) throw new NotFoundException('Partido no encontrado');
    if (!jugador) throw new NotFoundException('Jugador no encontrado');

    return await this.prisma.tarjeta.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.tarjeta.findMany();
  }

  async findByPartido(partidoId: string) {
    return await this.prisma.tarjeta.findMany({ where: { partidoId } });
  }

  async findByJugador(jugadorId: string) {
    return await this.prisma.tarjeta.findMany({ where: { jugadorId } });
  }

  async findOne(id: string) {
    const tarjeta = await this.prisma.tarjeta.findUnique({ where: { id } });
    if (!tarjeta) throw new NotFoundException(`Tarjeta ${id} no encontrada`);
    return tarjeta;
  }

  async update(id: string, dto: UpdateTarjetaDto) {
    await this.findOne(id);
    return await this.prisma.tarjeta.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.tarjeta.delete({ where: { id } });
  }
}