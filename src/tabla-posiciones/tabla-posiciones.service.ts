import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilaTabla } from './interfaces/fila-tabla.interface';

@Injectable()
export class TablaPosicionesService {
  // Solo inyectamos Prisma, ya no necesitamos EquiposService ni PartidosService
  constructor(private prisma: PrismaService) {}

  async calcular(campeonatoId: string): Promise<FilaTabla[]> {
    // 1. Buscar equipos inscritos en este campeonato
    const equipos = await this.prisma.equipo.findMany({
      where: { campeonatoId },
    });

    if (equipos.length === 0) {
      throw new NotFoundException(`No hay equipos inscritos en el campeonato "${campeonatoId}"`);
    }

    // 2. Buscar solo los partidos que ya se jugaron (los que tienen resultado)
    const partidos = await this.prisma.partido.findMany({
      where: {
        campeonatoId,
        estado: 'jugado',
        golesLocal: { not: null },
        golesVisitante: { not: null },
      },
    });

    // 3. Inicializar el mapa con todos los equipos en cero
    const mapa = new Map<string, Omit<FilaTabla, 'posicion' | 'dg'>>();
    equipos.forEach((e) =>
      mapa.set(e.id, {
        equipoId: e.id,
        equipo: e.nombre,
        pj: 0, pg: 0, pe: 0, pp: 0,
        gf: 0, gc: 0, pts: 0,
      }),
    );

    // 4. Procesar los partidos jugados
    for (const p of partidos) {
      const local = mapa.get(p.equipoLocalId);
      const visitante = mapa.get(p.equipoVisitanteId);
      if (!local || !visitante) continue; // Por seguridad

      // Como validamos arriba que no son nulos, forzamos el tipo con !
      const gl = p.golesLocal!;
      const gv = p.golesVisitante!;

      local.pj++;
      visitante.pj++;
      local.gf += gl;
      local.gc += gv;
      visitante.gf += gv;
      visitante.gc += gl;

      if (gl > gv) {
        local.pg++;
        local.pts += 3;
        visitante.pp++;
      } else if (gl < gv) {
        visitante.pg++;
        visitante.pts += 3;
        local.pp++;
      } else {
        local.pe++;
        visitante.pe++;
        local.pts += 1;
        visitante.pts += 1;
      }
    }

    // 5. Convertir a arreglo, calcular Diferencia de Goles y ordenar
    const filas: Omit<FilaTabla, 'posicion'>[] = Array.from(mapa.values()).map(
      (f) => ({ ...f, dg: f.gf - f.gc }),
    );

    filas.sort(
      (a, b) =>
        b.pts - a.pts ||
        b.dg - a.dg ||
        b.gf - a.gf ||
        a.equipo.localeCompare(b.equipo),
    );

    return filas.map((f, i) => ({ posicion: i + 1, ...f }));
  }
}