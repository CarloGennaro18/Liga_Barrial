import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';

@Injectable()
export class CanchasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCanchaDto) {
    return await this.prisma.cancha.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.cancha.findMany();
  }

  async findOne(id: string) {
    const cancha = await this.prisma.cancha.findUnique({ where: { id } });
    if (!cancha) throw new NotFoundException(`Cancha ${id} no encontrada`);
    return cancha;
  }

  async update(id: string, dto: UpdateCanchaDto) {
    await this.findOne(id);
    return await this.prisma.cancha.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.cancha.delete({ where: { id } });
  }
}