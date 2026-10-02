import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Campeonato } from './entities/campeonato.entity';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';

@Injectable()
export class CampeonatosService {
  private readonly campeonatos: Campeonato[] = [];

  create(dto: CreateCampeonatoDto): Campeonato {
    const nuevo: Campeonato = { id: randomUUID(), ...dto };
    this.campeonatos.push(nuevo);
    return nuevo;
  }

  findAll(): Campeonato[] {
    return this.campeonatos;
  }

  findOne(id: string): Campeonato {
    const encontrado = this.campeonatos.find((c) => c.id === id);
    if (!encontrado) {
      throw new NotFoundException(`Campeonato con id "${id}" no encontrado`);
    }
    return encontrado;
  }

  update(id: string, dto: UpdateCampeonatoDto): Campeonato {
    const campeonato = this.findOne(id);
    Object.assign(campeonato, dto);
    return campeonato;
  }

  remove(id: string): void {
    const index = this.campeonatos.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Campeonato con id "${id}" no encontrado`);
    }
    this.campeonatos.splice(index, 1);
  }
}