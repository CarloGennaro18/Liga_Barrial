import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Arbitro } from './entities/arbitro.entity';
import { CreateArbitroDto } from './dto/create-arbitro.dto';
import { UpdateArbitroDto } from './dto/update-arbitro.dto';

@Injectable()
export class ArbitrosService {
  private readonly arbitros: Arbitro[] = [];

  create(dto: CreateArbitroDto): Arbitro {
    const nuevo: Arbitro = { id: randomUUID(), ...dto };
    this.arbitros.push(nuevo);
    return nuevo;
  }

  findAll(): Arbitro[] {
    return this.arbitros;
  }

  findOne(id: string): Arbitro {
    const a = this.arbitros.find((x) => x.id === id);
    if (!a) throw new NotFoundException(`Árbitro con id "${id}" no encontrado`);
    return a;
  }

  update(id: string, dto: UpdateArbitroDto): Arbitro {
    const a = this.findOne(id);
    Object.assign(a, dto);
    return a;
  }

  remove(id: string): void {
    const index = this.arbitros.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException(`Árbitro con id "${id}" no encontrado`);
    this.arbitros.splice(index, 1);
  }
}