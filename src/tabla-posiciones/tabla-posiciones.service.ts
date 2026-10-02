import { Injectable, NotFoundException } from '@nestjs/common';
import { EquiposService } from '../equipos/equipos.service';
import { PartidosService } from '../partidos/partidos.service';
import { FilaTabla } from './interfaces/fila-tabla.interface';

@Injectable()
export class TablaPosicionesService {
  constructor(
    private readonly equiposService: EquiposService,
    private readonly partidosService: PartidosService,
  ) {}

  calcular(campeonatoId: string): FilaTabla[] {
    const equipos = this.equiposService.findByCampeonato(campeonatoId);
    if (equipos.length === 0) {
      throw new NotFoundException(
        `No hay equipos inscritos en el campeonato "${campeonatoId}"`,
      );
    }

    const partidos = this.partidosService.findByCampeonato(campeonatoId);

    // Inicializamos la tabla con todos los equipos en cero
    const mapa = new Map<string, Omit<FilaTabla, 'posicion' | 'dg'>>();
    equipos.forEach((e) =>
      mapa.set(e.id, {
        equipoId: e.id,
        equipo: e.nombre,
        pj: 0, pg: 0, pe: 0, pp: 0,
        gf: 0, gc: 0, pts: 0,
      }),
    );

    // Recorremos los partidos que ya tienen resultado
    for (const p of partidos) {
      if (!p.resultado) continue;

      const local = mapa.get(p.equipoLocalId);
      const visitante = mapa.get(p.equipoVisitanteId);
      if (!local || !visitante) continue;

      const gl = p.resultado.golesLocal;
      const gv = p.resultado.golesVisitante;

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

    // Convertimos a arreglo, calculamos DG y ordenamos
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