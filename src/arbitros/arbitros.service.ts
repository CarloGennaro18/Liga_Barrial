import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArbitroDto } from './dto/create-arbitro.dto';
import { UpdateArbitroDto } from './dto/update-arbitro.dto';

@Injectable()
export class ArbitrosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArbitroDto) {
    return await this.prisma.arbitro.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.arbitro.findMany();
  }

  async findOne(id: string) {
    const arbitro = await this.prisma.arbitro.findUnique({ where: { id } });
    if (!arbitro) throw new NotFoundException(`Árbitro ${id} no encontrado`);
    return arbitro;
  }

  async update(id: string, dto: UpdateArbitroDto) {
    await this.findOne(id);
    return await this.prisma.arbitro.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.arbitro.delete({ where: { id } });
  }
}