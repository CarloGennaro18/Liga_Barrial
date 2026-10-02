import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cancha } from './entities/cancha.entity';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';

@Injectable()
export class CanchasService {
  private readonly canchas: Cancha[] = [];

  create(dto: CreateCanchaDto): Cancha {
    const nueva: Cancha = { id: randomUUID(), ...dto };
    this.canchas.push(nueva);
    return nueva;
  }

  findAll(): Cancha[] {
    return this.canchas;
  }

  findOne(id: string): Cancha {
    const c = this.canchas.find((x) => x.id === id);
    if (!c) throw new NotFoundException(`Cancha con id "${id}" no encontrada`);
    return c;
  }

  update(id: string, dto: UpdateCanchaDto): Cancha {
    const c = this.findOne(id);
    Object.assign(c, dto);
    return c;
  }

  remove(id: string): void {
    const index = this.canchas.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Cancha con id "${id}" no encontrada`);
    this.canchas.splice(index, 1);
  }
}