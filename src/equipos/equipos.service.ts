import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InscribirEquipoDto } from './dto/inscribir-equipo.dto';

@Injectable()
export class EquiposService {
  private readonly equipos: Equipo[] = [];

  create(dto: CreateEquipoDto): Equipo {
    const nuevo: Equipo = {
      id: randomUUID(),
      nombre: dto.nombre,
      representante: dto.representante,
      telefono: dto.telefono,
      campeonatoId: dto.campeonatoId ?? null,
      fechaInscripcion: dto.campeonatoId ? new Date().toISOString() : null,
    };
    this.equipos.push(nuevo);
    return nuevo;
  }

  findAll(): Equipo[] {
    return this.equipos;
  }

  findByCampeonato(campeonatoId: string): Equipo[] {
    return this.equipos.filter((e) => e.campeonatoId === campeonatoId);
  }

  findOne(id: string): Equipo {
    const eq = this.equipos.find((e) => e.id === id);
    if (!eq) throw new NotFoundException(`Equipo con id "${id}" no encontrado`);
    return eq;
  }

  update(id: string, dto: UpdateEquipoDto): Equipo {
    const eq = this.findOne(id);
    Object.assign(eq, dto);
    return eq;
  }

  inscribir(id: string, dto: InscribirEquipoDto): Equipo {
    const eq = this.findOne(id);
    eq.campeonatoId = dto.campeonatoId;
    eq.fechaInscripcion = new Date().toISOString();
    return eq;
  }

  remove(id: string): void {
    const index = this.equipos.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException(`Equipo con id "${id}" no encontrado`);
    this.equipos.splice(index, 1);
  }
}