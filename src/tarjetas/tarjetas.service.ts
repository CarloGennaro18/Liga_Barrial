import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Tarjeta } from './entities/tarjeta.entity';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import { PartidosService } from '../partidos/partidos.service';
import { JugadoresService } from '../jugadores/jugadores.service';

@Injectable()
export class TarjetasService {
  private readonly tarjetas: Tarjeta[] = [];

  constructor(
    // Inyección de dependencias: usamos otros servicios para validar
    private readonly partidosService: PartidosService,
    private readonly jugadoresService: JugadoresService,
  ) {}

  create(dto: CreateTarjetaDto): Tarjeta {
    // Valida que existan (lanza 404 si no)
    this.partidosService.findOne(dto.partidoId);
    this.jugadoresService.findOne(dto.jugadorId);

    const nueva: Tarjeta = { id: randomUUID(), ...dto };
    this.tarjetas.push(nueva);
    return nueva;
  }

  findAll(): Tarjeta[] {
    return this.tarjetas;
  }

  findByPartido(partidoId: string): Tarjeta[] {
    return this.tarjetas.filter((t) => t.partidoId === partidoId);
  }

  findByJugador(jugadorId: string): Tarjeta[] {
    return this.tarjetas.filter((t) => t.jugadorId === jugadorId);
  }

  findOne(id: string): Tarjeta {
    const t = this.tarjetas.find((x) => x.id === id);
    if (!t) throw new NotFoundException(`Tarjeta con id "${id}" no encontrada`);
    return t;
  }

  update(id: string, dto: UpdateTarjetaDto): Tarjeta {
    const t = this.findOne(id);
    if (dto.partidoId) this.partidosService.findOne(dto.partidoId);
    if (dto.jugadorId) this.jugadoresService.findOne(dto.jugadorId);
    Object.assign(t, dto);
    return t;
  }

  remove(id: string): void {
    const index = this.tarjetas.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Tarjeta con id "${id}" no encontrada`);
    this.tarjetas.splice(index, 1);
  }
}