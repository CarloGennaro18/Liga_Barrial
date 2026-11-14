import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Injectable()
export class JugadoresService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJugadorDto) {
    return await this.prisma.jugador.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.jugador.findMany();
  }

  async findByEquipo(equipoId: string) {
    return await this.prisma.jugador.findMany({ where: { equipoId } });
  }

  async findOne(id: string) {
    const jugador = await this.prisma.jugador.findUnique({ where: { id } });
    if (!jugador) throw new NotFoundException(`Jugador ${id} no encontrado`);
    return jugador;
  }

  async update(id: string, dto: UpdateJugadorDto) {
    await this.findOne(id);
    return await this.prisma.jugador.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.jugador.delete({ where: { id } });
  }
}