export type EstadoPartido = 'programado' | 'jugado';

export class Resultado {
  golesLocal!: number;
  golesVisitante!: number;
}

export class Partido {
  id!: string;
  campeonatoId!: string;
  jornada!: number;
  equipoLocalId!: string;
  equipoVisitanteId!: string;
  arbitroId!: string;
  canchaId!: string;
  fecha!: string;      // YYYY-MM-DD
  hora!: string;       // HH:mm
  estado!: EstadoPartido;
  resultado?: Resultado;
}