import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InscribirEquipoDto } from './dto/inscribir-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEquipoDto) {
    return await this.prisma.equipo.create({
      data: {
        ...dto,
        fechaInscripcion: dto.campeonatoId ? new Date().toISOString() : null,
      },
    });
  }

  async findAll() {
    return await this.prisma.equipo.findMany();
  }

  async findByCampeonato(campeonatoId: string) {
    return await this.prisma.equipo.findMany({ where: { campeonatoId } });
  }

  async findOne(id: string) {
    const equipo = await this.prisma.equipo.findUnique({ where: { id } });
    if (!equipo) throw new NotFoundException(`Equipo ${id} no encontrado`);
    return equipo;
  }

  async update(id: string, dto: UpdateEquipoDto) {
    await this.findOne(id);
    return await this.prisma.equipo.update({ where: { id }, data: dto });
  }

  async inscribir(id: string, dto: InscribirEquipoDto) {
    await this.findOne(id);
    return await this.prisma.equipo.update({
      where: { id },
      data: {
        campeonatoId: dto.campeonatoId,
        fechaInscripcion: new Date().toISOString(),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.equipo.delete({ where: { id } });
  }
}