export type EstadoCampeonato = 'planificado' | 'en_curso' | 'finalizado';

export class Campeonato {
  id!: string;
  nombre!: string;
  temporada!: string;
  fechaInicio!: string;
  fechaFin!: string;
  estado!: EstadoCampeonato;
}