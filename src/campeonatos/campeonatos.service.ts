import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';

@Injectable()
export class CampeonatosService {
  constructor(private prisma: PrismaService) {} // Inyectamos Prisma

  async create(dto: CreateCampeonatoDto) {
    return await this.prisma.campeonato.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.campeonato.findMany();
  }

  async findOne(id: string) {
    const campeonato = await this.prisma.campeonato.findUnique({ where: { id } });
    if (!campeonato) throw new NotFoundException(`Campeonato ${id} no encontrado`);
    return campeonato;
  }

  async update(id: string, dto: UpdateCampeonatoDto) {
    await this.findOne(id); // Valida que exista
    return await this.prisma.campeonato.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.campeonato.delete({ where: { id } });
  }
}