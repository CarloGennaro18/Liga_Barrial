import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Partido } from './entities/partido.entity';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { RegistrarResultadoDto } from './dto/registrar-resultado.dto';

@Injectable()
export class PartidosService {
  private readonly partidos: Partido[] = [];

  create(dto: CreatePartidoDto): Partido {
    if (dto.equipoLocalId === dto.equipoVisitanteId) {
      throw new BadRequestException(
        'El equipo local y el visitante no pueden ser el mismo',
      );
    }

    const nuevo: Partido = {
      id: randomUUID(),
      ...dto,
      estado: 'programado',
    };
    this.partidos.push(nuevo);
    return nuevo;
  }

  findAll(): Partido[] {
    return this.partidos;
  }

  findByCampeonato(campeonatoId: string): Partido[] {
    return this.partidos.filter((p) => p.campeonatoId === campeonatoId);
  }

  findOne(id: string): Partido {
    const p = this.partidos.find((x) => x.id === id);
    if (!p) throw new NotFoundException(`Partido con id "${id}" no encontrado`);
    return p;
  }

  update(id: string, dto: UpdatePartidoDto): Partido {
    const p = this.findOne(id);
    if (dto.equipoLocalId && dto.equipoVisitanteId &&
        dto.equipoLocalId === dto.equipoVisitanteId) {
      throw new BadRequestException(
        'El equipo local y el visitante no pueden ser el mismo',
      );
    }
    Object.assign(p, dto);
    return p;
  }

  /** Registra (o reemplaza) el resultado del partido */
  registrarResultado(id: string, dto: RegistrarResultadoDto): Partido {
    const p = this.findOne(id);
    p.resultado = {
      golesLocal: dto.golesLocal,
      golesVisitante: dto.golesVisitante,
    };
    p.estado = 'jugado';
    return p;
  }

  remove(id: string): void {
    const index = this.partidos.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Partido con id "${id}" no encontrado`);
    this.partidos.splice(index, 1);
  }
}