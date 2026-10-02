import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Jugador } from './entities/jugador.entity';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';

@Injectable()
export class JugadoresService {
  private readonly jugadores: Jugador[] = [];

  create(dto: CreateJugadorDto): Jugador {
    const nuevo: Jugador = { id: randomUUID(), ...dto };
    this.jugadores.push(nuevo);
    return nuevo;
  }

  findAll(): Jugador[] {
    return this.jugadores;
  }

  findByEquipo(equipoId: string): Jugador[] {
    return this.jugadores.filter((j) => j.equipoId === equipoId);
  }

  findOne(id: string): Jugador {
    const j = this.jugadores.find((x) => x.id === id);
    if (!j) throw new NotFoundException(`Jugador con id "${id}" no encontrado`);
    return j;
  }

  update(id: string, dto: UpdateJugadorDto): Jugador {
    const j = this.findOne(id);
    Object.assign(j, dto);
    return j;
  }

  remove(id: string): void {
    const index = this.jugadores.findIndex((j) => j.id === id);
    if (index === -1) throw new NotFoundException(`Jugador con id "${id}" no encontrado`);
    this.jugadores.splice(index, 1);
  }
}